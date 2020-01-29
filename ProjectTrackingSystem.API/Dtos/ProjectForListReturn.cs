using System;

namespace ProjectTrackingSystem.API.Dtos {
    public class ProjectForListReturn {

        public int Id { get; set; }
        public string ProjectCode { get; set; }
        public string ProjectName { get; set; }
        public int Budget { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Currency { get; set; }
        public string Programme { get; set; }

    }
}