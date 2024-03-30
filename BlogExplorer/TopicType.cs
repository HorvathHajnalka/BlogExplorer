using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlogExplorer
{
    [Table("topic_types")]
    public class TopicType
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(255)]
        public string Name { get; set; }

        // Navigation property
        public ICollection<Topic> Topics { get; set; }
    }
}
