using System;
namespace ProjectTrackingSystem.API.Dtos {
    public class TransactionForAddDto {
        public int Id { get; set; }
        public int TransactionTypeId { get; set; }
        public string Description { get; set; }
        public DateTime TransactionDate { get; set; }
        public float Amount { get; set; }
        public int CurrencyId { get; set; }
        public float ExchangeRate { get; set; }
        public int ProvinceId { get; set; }
        public int WBSId { get; set; }
    }
}