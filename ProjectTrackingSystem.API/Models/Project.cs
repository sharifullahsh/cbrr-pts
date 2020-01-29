
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectTrackingSystem.API.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string ProjectCode { get; set; }
        public string ProjectName { get; set; }
        public int Budget { get; set; }
        public DateTime  StartDate { get; set; }
        public DateTime EndDate { get; set; }

         [ForeignKey("Currency")]
        public int CurrencyId { get; set; }
        public int ProgrammeId { get; set; }
        public bool IsDeleted { get; set; }
        public virtual Currency Currency {get; set;}
        public virtual Programme Programme {get;set;}
        public ICollection<ProjectDocument> ProjectDocuments { get; set; }
        public ICollection<WBS> WBS { get; set; }

        public Project ()
        {
            IsDeleted=false;
        }

    }
}