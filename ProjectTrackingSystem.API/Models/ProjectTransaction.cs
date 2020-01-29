
using System;
using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class ProjectTransaction
    {
        public int Id { get; set; }
        public int TransactionTypeId { get; set; }
        public string Description { get; set; }
        public DateTime TransactionDate { get; set; }
        public float Amount { get; set; }
        public int CurrencyId { get; set; }
        public float ExchangeRate { get; set; }
        public int ProvinceId { get; set; }
        public int WBSId { get; set; }
        public bool IsDeleted { get; set; }

        public virtual WBS WBS { get; set; }
        public virtual Province Province { get; set; }
        public virtual Currency Currency { get; set; }
        public virtual TransactionType TransactionType { get; set; }
        public ICollection<TransactionEvent> TransactionEvents { get; set; }

        public ProjectTransaction()
        {
            IsDeleted=false;
        }

    }
}