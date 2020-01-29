using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class EventStatus
    {
        public int Id { get; set; }
        public string EventStatusName { get; set; }
        public ICollection<TransactionEvent> TransactionEvents { get; set; }
    }
}