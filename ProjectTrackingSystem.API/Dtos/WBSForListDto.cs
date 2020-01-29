using System;

namespace ProjectTrackingSystem.API.Dtos {
    public class WBSForListDto {

        public int Id { get; set; }
        public int WBSId { get; set; }
        public float Target { get; set; }
        public string WBSName { get; set; }
        public string Description { get; set; }
        public float UnitCost { get; set; }
        public float Budget { get; set; }
        public int? UnitId { get; set; }
        public int ProjectId { get; set; }

    }
}