using System;

namespace ProjectTrackingSystem.API.Dtos {
    public class TransEventsForListDto {

       public int Id { get; set; }
        public int EventTypeId { get; set; }
        public DateTime EventDate { get; set; }
        public int DepartmentId { get; set; }
        public bool IsDeleted { get; set; }
        public int ResponsibleId { get; set; }
        public int EventStatusId { get; set; }
        public int ProjectTransactionId { get; set; }
        public string Remarks { get; set; }
        public string EventTypeName { get; set; }
        public string DepartmentName { get; set; }
        public string ResponsibleName { get; set; }
        public string EventStatusName { get; set; }
        public string URL { get; set; }
    }
}