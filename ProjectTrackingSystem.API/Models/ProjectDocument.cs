using System;
using System.Collections;
using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class ProjectDocument
    {
        public int Id { get; set; }
        public int DocumentTypeId { get; set; }
        public string DocumentName { get; set; }
        public string Url { get; set; }
        public int ProjectId { get; set; }
        public virtual Project Project { get; set; }
        public virtual DocumentType  DocumentType { get; set; }
    }
}