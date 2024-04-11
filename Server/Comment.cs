using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BlogExplorer
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        [Column("topic_id")]
        public int TopicId { get; set; }
        [ForeignKey("TopicId")]
        public Topic Topic { get; set; }

        [MaxLength(255)]
        public string Body { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
