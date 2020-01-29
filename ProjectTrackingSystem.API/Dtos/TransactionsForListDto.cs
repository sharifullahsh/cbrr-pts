using System;

namespace ProjectTrackingSystem.API.Dtos {
    public class TransactionsForListDto {

      public int Id { get; set; }
        public int TransactionTypeId { get; set; }
        public string Description { get; set; }
        public DateTime TransactionDate { get; set; }
        public float Amount { get; set; }
        public int CurrencyId { get; set; }
        public float ExchangeRate { get; set; }
        public int ProvinceId { get; set; }
        public int WBSId { get; set; }
        
        //Referenced Columns for displaying only
        public string TransactionType { get; set; }
        public string CurrencyName { get; set; }
        public string ProvinceName { get; set; }
        public string WBSName { get; set; }



    }
}