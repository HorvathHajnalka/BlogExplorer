using System.ComponentModel.DataAnnotations;

namespace BlogExplorer
{
    public class User
    {

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Username { get; set; }

        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Password { get; set; }
    }
}
