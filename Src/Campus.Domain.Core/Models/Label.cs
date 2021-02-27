using System;
using System.Collections.Generic;
using Campus.Domain.Core.Templates;

namespace Campus.Domain.Core.Models
{
    public class Label : IUserReference
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string ColorHex { get; set; }
        public bool IsDefault { get; set; }

        public int? ClassroomId { get; set; }
        public Classroom Classroom { get; set; }

        public string CreatedById { get; set; }
        public User CreatedByUser { get; set; }
        public DateTime CreatedOn { get; set; }

        public string ModifiedById { get; set; }
        public User ModifiedByUser { get; set; }
        public DateTime ModifiedOn { get; set; }

        public ICollection<EventLabel> Events { get; set; }
    }
}