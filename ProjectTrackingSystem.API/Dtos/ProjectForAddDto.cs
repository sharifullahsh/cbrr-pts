using System;

namespace ProjectTrackingSystem.API.Dtos
{
    public class ProjectForAddDto
    {
        public int Id { get; set; }
        public string ProjectCode { get; set; }
        public string ProjectName { get; set; }
        public int Budget { get; set; }
        public DateTime  StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int CurrencyId { get; set; }
        public int ProgrammeId { get; set; }
       
    }
}