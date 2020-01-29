using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string DepartmentName { get; set; }
        public ICollection<TransactionEvent> TransactionEvents { get; set; }
    }
}