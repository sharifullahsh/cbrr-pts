using System;
namespace ProjectTrackingSystem.API.Helpers
{
    public class TransParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 5;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }
        public int WBSId { get; set; }

        public int? TransactionTypeId { get; set; }

        public string FromDate { get; set; }

         public string ToDate { get; set; }

        public int? ProvinceId { get; set; }
    }
}