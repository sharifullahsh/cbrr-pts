using System.Threading.Tasks;
using ProjectTrackingSystem.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ProjectTrackingSystem.API.Dtos;
using Microsoft.AspNetCore.Identity;
using ProjectTrackingSystem.API.Models;
using Microsoft.Extensions.Options;
using ProjectTrackingSystem.API.Helpers;
using AutoMapper;

namespace ProjectTrackingSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController:ControllerBase
    {
         private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly IMapper _mapper;
         public AdminController(
            IMapper mapper,
            DataContext context,
            RoleManager<Role> roleMgr,
            UserManager<User> userManager
            
            )
        {
            _userManager = userManager;          
            _context = context;       
            _roleManager = roleMgr; 
            _mapper = mapper;
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await (from user in _context.Users
                                  orderby user.UserName
                                  select new
                                  {
                                      Id = user.Id,
                                      UserName = user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList()
                                  }).ToListAsync();
            return Ok(userList);
        }
        [Authorize]
        [HttpGet("getUser/{id}")]
        public async Task<IActionResult> GetUser(int id = 0)
        {
            var _user = await (from user in _context.Users
                                  select new
                                  {
                                      Id = user.Id,
                                      UserName = user.UserName,
                                      user.ProgramId,
                                      ProgrammeName = _context.Programmes.Where(p=>p.Id == user.ProgramId).Select(p=>p.ProgrammeName).FirstOrDefault(),
                                      user.ProvinceId,
                                      ProvinceName = _context.Provinces.Where(p=>p.Id == user.ProvinceId).Select(p=>p.ProvinceName).FirstOrDefault(),
                                      RoleId = _context.UserRoles.Where(r=> r.UserId == user.Id).Select(u=>u.RoleId).FirstOrDefault(),
                                      RoleName = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).FirstOrDefault()
                                  })
                                  .Where(User=>User.Id == id)
                                  .FirstOrDefaultAsync();
            return Ok(_user);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("allUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var userList = await (from user in _context.Users
                                  orderby user.UserName
                                  select new
                                  {
                                      Id = user.Id,
                                      UserName = user.UserName,
                                      user.ProgramId,
                                      ProgrammeName = _context.Programmes.Where(p=>p.Id == user.ProgramId).Select(p=>p.ProgrammeName).FirstOrDefault(),
                                      user.ProvinceId,
                                      ProvinceName = _context.Provinces.Where(p=>p.Id == user.ProvinceId).Select(p=>p.ProvinceName).FirstOrDefault(),
                                      RoleId = _context.UserRoles.Where(r=> r.UserId == user.Id).Select(u=>u.RoleId).FirstOrDefault(),
                                      RoleName = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).FirstOrDefault()
                                  })
                                  //.Where(User=>User.UserName != "Admin")
                                  .ToListAsync();
            return Ok(userList);
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("getAllRoles")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _roleManager.Roles.Select(r=>new {r.Id, r.Name}).ToListAsync();
            return Ok(roles);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("editRoles/{userName}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string[] { };
            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to remove the roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            var role = _roleManager.FindByIdAsync(userForRegisterDto.RoleId).Result;
            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            IdentityResult result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);

            //var userToReturn = _mapper.Map<UserForDetailedDto>(userToCreate);

            if (result.Succeeded)
            {
                var createdUser = _userManager.FindByNameAsync(userForRegisterDto.Username).Result;
                 _userManager.AddToRoleAsync(createdUser,role.Name).Wait();
                 return Ok();
                // return CreatedAtRoute("GetUser", 
                //     new { controller = "Users", id = userToCreate.Id }, userToReturn);
            }

            return BadRequest(result.Errors.ToString());
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("editUser")]
        public async Task<IActionResult> EditUser(UserForEditRegisterDto userEditDto)
        {
            var user = await _userManager.FindByIdAsync(userEditDto.Id.ToString());
            user.ProgramId = userEditDto.ProgramId;
            user.ProvinceId = userEditDto.ProvinceId;
            user.UserName = userEditDto.Username;
            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                 var editedUser = _userManager.FindByIdAsync(userEditDto.Id.ToString()).Result;
                var preRoles = await _roleManager.Roles.Select(r=>r.Name).ToListAsync();
                await _userManager.RemoveFromRolesAsync(editedUser, preRoles);
                var role = _roleManager.FindByIdAsync(userEditDto.RoleId).Result;
               
                 _userManager.AddToRoleAsync(editedUser,role.Name).Wait();
                 return Ok();
            }

            return BadRequest(result.Errors.ToString());
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("changePassword")]
        public async Task<IActionResult> EditPassword(UserPasswordChangeDto userPassChangeDto)
        {
         var user = await _userManager.FindByIdAsync(userPassChangeDto.Id.ToString());
          var result =  await _userManager.ChangePasswordAsync(user, userPassChangeDto.CurrentPassword, userPassChangeDto.NewPassword);

            if (result.Succeeded)
            {
                 return Ok();
            }

            return BadRequest(result.Errors.ToString());
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("resetPasswrod/{id}")]
        public async Task<IActionResult> ResetPassword(int id = 0)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if(user == null){
                return NotFound();
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user, token, "1234");

            if (result.Succeeded)
            {
                 return Ok();
            }

            return BadRequest(result.Errors.ToString());
        }

    }
}