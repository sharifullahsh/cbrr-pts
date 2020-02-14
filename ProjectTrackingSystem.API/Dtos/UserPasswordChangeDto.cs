using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectTrackingSystem.API.Dtos
{
    public class UserPasswordChangeDto
    {
        public int Id { get; set; }
        public string CurrentPassword { get; set; } 

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters")]
        public string NewPassword { get; set; } 
    }
}