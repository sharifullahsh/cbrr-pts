using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class Province
    {
        public int Id { get; set; }
        public string ProvinceName { get; set; }

        public ICollection<ProjectTransaction> ProjectTransactions { get; set; }
    }
}