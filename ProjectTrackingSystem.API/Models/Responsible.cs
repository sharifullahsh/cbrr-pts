using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class Responsible
    {
        public int Id { get; set; }
        public string ResponsibleName { get; set; }
        public ICollection<TransactionEvent> TransactionEvents { get; set; }
    }
}