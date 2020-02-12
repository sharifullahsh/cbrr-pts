using System;
using System.ComponentModel.DataAnnotations;

namespace ProjectTrackingSystem.API.Dtos
{
    public class UserForEditRegisterDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

         [Required]
        public string RoleId { get; set; }       

        [Required]
        public int ProgramId { get; set; }

        [Required]
        public int ProvinceId { get; set; }
    }
}