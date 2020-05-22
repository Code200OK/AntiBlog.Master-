﻿namespace Campus.Domain.Core.Models
{
    public class AppUser
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public string Login { get; set; }

        public byte[] PasswordHash { get; set; }
        
        public byte[] PasswordSalt { get; set; }
        
        public string RegistrationDate { get; set; }

        public int RoleId { get; set; }
    }
}