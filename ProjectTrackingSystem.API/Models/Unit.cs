using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class Unit
    {
        public int Id { get; set; }
        public string UnitName { get; set; }
        public ICollection<WBS> WBS { get; set; }
    }
}