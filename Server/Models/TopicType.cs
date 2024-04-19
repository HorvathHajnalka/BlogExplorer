using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class TopicType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TopicTypeId { get; set; }

        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        // Navigation property
        // public ICollection<Topic> Topics { get; set; }
    }
}
