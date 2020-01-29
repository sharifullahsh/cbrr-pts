using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class TransactionType
    {
        public int Id { get; set; }
        public string TransactionTypeName { get; set; }
        public ICollection<ProjectTransaction> BusinessTransactions { get; set; }
    }
}