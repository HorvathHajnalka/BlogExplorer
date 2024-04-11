using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlogExplorer
{
    [Table("favorite_topics")]
    public class FavoriteTopic
    {
        [Key]
        [Column("user_id", Order = 1)]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        [Key]
        [Column("topic_id", Order = 2)]
        public int TopicId { get; set; }
        [ForeignKey("TopicId")]
        public Topic Topic { get; set; }
    }
}
