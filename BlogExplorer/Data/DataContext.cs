using Microsoft.EntityFrameworkCore;

namespace BlogExplorer.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<FavoriteTopic> FavoriteTopics { get; set; }
        public DbSet<TopicType> TopicTypes { get; set; }
        public DbSet<Comment> Comments { get; set; }

        // fix issues with double primary key in favorite topic

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Composite key configuration for FavoriteTopics
            modelBuilder.Entity<FavoriteTopic>()
                .HasKey(ft => new { ft.UserId, ft.TopicId });

            // Other model configurations can go here
        }
    }
}
