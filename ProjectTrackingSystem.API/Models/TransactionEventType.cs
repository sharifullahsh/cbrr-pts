using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class TransactionEventType
    {
        public int Id { get; set; }
        public string EventTypeName { get; set; }
        public ICollection<TransactionEvent> TransactionEvents { get; set; }
    }
}