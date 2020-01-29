using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProjectTrackingSystem.API.Models
{
    public class WBS
    {
        public int Id { get; set; }
        public int WBSId { get; set; }
        public string WBSName { get; set; }
        public string Description { get; set; }
        public float Target { get; set; }
        public float UnitCost { get; set; }
        public float Budget { get; set; }
        public int? UnitId { get; set; }
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
        public virtual Unit Unit { get; set; }
        public ICollection<ProjectTransaction> ProjectTransactions { get; set; }
    }
}