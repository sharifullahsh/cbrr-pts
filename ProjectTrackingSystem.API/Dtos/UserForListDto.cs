using System;

namespace ProjectTrackingSystem.API.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public int ProvinceId { get; set; }
        public int ProgramId { get; set; }
    }
}