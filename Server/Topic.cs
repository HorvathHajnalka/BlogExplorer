using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlogExplorer
{
    public class Topic
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [MaxLength(255)]
        public string Name { get; set; }

        [Column("type_id")]
        public int TypeId { get; set; }
        [ForeignKey("TypeId")]
        public TopicType TopicType { get; set; }

        [MaxLength(255)]
        public string Description { get; set; }

        // Navigation properties
        public ICollection<FavoriteTopic> FavoriteTopics { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
