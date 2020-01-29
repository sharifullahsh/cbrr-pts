using System;

namespace ProjectTrackingSystem.API.Dtos {
    public class TransEventsForAddDto {

       public int Id { get; set; }
        public int EventTypeId { get; set; }
        public int TransactionEventTypeId { get; set; }
        public DateTime EventDate { get; set; }
        public int DepartmentId { get; set; }
        public bool IsDeleted { get; set; }
        public int ResponsibleId { get; set; }
        public int EventStatusId { get; set; }
        public string Remarks { get; set; }
        public int ProjectTransactionId { get; set; }
        public string URL { get; set; }
    
    }
}