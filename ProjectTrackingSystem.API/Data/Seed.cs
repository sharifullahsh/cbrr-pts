using System.Collections.Generic;
using System.Linq;
using ProjectTrackingSystem.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace ProjectTrackingSystem.API.Data
{
    public class Seed
    {
          public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role>
                {
                    new Role{Name = "DataEntry"},
                    new Role{Name = "Admin"},
                  
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                   
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "DataEntry").Wait();
                }

                var adminUser = new User
                {
                    UserName = "Admin",
                    ProgramId=1,
                    ProvinceId=1
                };

                IdentityResult result = userManager.CreateAsync(adminUser, "password").Result;

                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("Admin").Result;
                    userManager.AddToRolesAsync(admin, new[] {"Admin"}).Wait();
                }
            }
        }
    }
    
}