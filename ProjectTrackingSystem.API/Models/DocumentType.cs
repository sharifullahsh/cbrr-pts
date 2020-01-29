using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class DocumentType
    {
        public int Id { get; set; }
        public string DocumentTypeName { get; set; }
        public ICollection<ProjectDocument> ProjectDocuments { get; set; }
    }
}