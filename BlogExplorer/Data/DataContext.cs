using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace BlogExplorer.Data
{
    public class DataContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public DataContext(DbContextOptions<DataContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<FavoriteTopic> FavoriteTopics { get; set; }
        public DbSet<TopicType> TopicTypes { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FavoriteTopic>().HasKey(ft => new { ft.UserId, ft.TopicId });

            // Seed initial data
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "example_user", Name = "Example User", Password = "example_password" }
                // Add additional users here
            );

            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
            }
        }

        public void EnsureDatabaseSeeded()
        {
            if (!Users.Any())
            {
                SeedUsers();
            }

            // További ellenőrzések és adatfeltöltések más entitásokhoz
        }

        private void SeedUsers()
        {
            var users = new List<User>
            {
                new User { Id = 1, Username = "example_user", Name = "Example User", Password = "example_password" }
                // További felhasználók hozzáadása
            };

            Users.AddRange(users);
            SaveChanges();
        }
    }
}
