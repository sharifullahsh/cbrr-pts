using System;
using System.Collections;
using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class Programme
    {
        public int Id { get; set; }
        public string ProgrammeName { get; set; }
        public ICollection<Project> Projects { get; set; }
    }
}