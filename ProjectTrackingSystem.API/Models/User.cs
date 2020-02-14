using System;
using System.Collections;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
namespace ProjectTrackingSystem.API.Models
{
    public class User:IdentityUser<int>
    {
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public int ProvinceId { get; set; }
        public int ProgramId { get; set; }
        public bool IsDeleted { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
        public User ()
        {
            IsDeleted=false;
        }
    }
}