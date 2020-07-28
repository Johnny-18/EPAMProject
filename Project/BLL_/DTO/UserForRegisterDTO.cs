using System;
using System.ComponentModel.DataAnnotations;

namespace BLL_.DTO
{
    public class UserForRegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(16, MinimumLength = 4, ErrorMessage = "password length from 4 to 16")]
        public string Password { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Age { get; set; }
        public DateTime Created { get; set; }

        public UserForRegisterDTO()
        {
            Created = DateTime.Now;
        }
    }
}
