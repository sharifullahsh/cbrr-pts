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

namespace ProjectTrackingSystem.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController:ControllerBase
    {
         private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
         public AdminController(
            DataContext context,
            RoleManager<Role> roleMgr,
            UserManager<User> userManager
            
            )
        {
            _userManager = userManager;          
            _context = context;       
            _roleManager = roleMgr; 
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

    }
}