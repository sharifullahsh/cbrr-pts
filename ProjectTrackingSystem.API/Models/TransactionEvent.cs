using System;
using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class TransactionEvent
    {
        public int Id { get; set; }
        public int EventTypeId { get; set; }
        public DateTime EventDate { get; set; }
        public int DepartmentId { get; set; }
        public bool IsDeleted { get; set; }
        public int ResponsibleId { get; set; }
        public int EventStatusId { get; set; }
        public string Remarks { get; set; }
        public int TransactionEventTypeId { get; set; }
        public int ProjectTransactionId { get; set; }
        public string URL { get; set; }
        public virtual ProjectTransaction ProjectTransaction { get; set; }
        public virtual EventStatus EventStatus { get; set; }
        public virtual TransactionEventType TransactionEventType { get; set; }
        public virtual Department Department { get; set; }
        public virtual Responsible Responsible { get; set; }       

        public TransactionEvent()
        {
            IsDeleted=false;
        }
    }
}