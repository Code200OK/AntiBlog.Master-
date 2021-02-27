using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Campus.Domain.Core.Templates;

namespace Campus.Domain.Core.Models
{
    public class Role : IdentityRole, IUserReference
    {
        public bool IsDefault { get; set; }

        public int? ClassroomId { get; set; }
        public Classroom Classroom { get; set; }

        public string CreatedById { get; set; }
        public User CreatedByUser { get; set; }
        public DateTime CreatedOn { get; set; }

        public string ModifiedById { get; set; }
        public User ModifiedByUser { get; set; }
        public DateTime ModifiedOn { get; set; }

        public ICollection<Participant> Participants { get; set; }
        public ICollection<RolePrivilege> Privileges { get; set; }
    }
}