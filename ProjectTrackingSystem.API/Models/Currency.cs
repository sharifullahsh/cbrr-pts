using System;
using System.Collections;
using System.Collections.Generic;

namespace ProjectTrackingSystem.API.Models
{
    public class Currency
    {
        public int Id { get; set; }
        public string CurrencyName { get; set; }
        public virtual ICollection<Project> Projects { get; set; }

    }
}