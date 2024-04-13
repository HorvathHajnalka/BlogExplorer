using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BlogExplorer.Data
{
    // DataContext class inherits from DbContext, providing the functionalities for using Entity Framework Core.
    public class DataContext : DbContext
    {
        // for configuration settings
        private readonly IConfiguration _configuration;

        public DataContext(DbContextOptions<DataContext> options, IConfiguration configuration) : base(options)
        {
            // Ensures that the database for the context exists. If it exists, no action is taken.
            // If it does not exist, then the database and all its schema are created.
            Database.EnsureCreated();
            _configuration = configuration;
        }

        // Properties for each table in the database represented by a DbSet.
        public DbSet<User> Users { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<FavoriteTopic> FavoriteTopics { get; set; }
        public DbSet<TopicType> TopicTypes { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configures a composite primary key for the FavoriteTopic entity.
            modelBuilder.Entity<FavoriteTopic>().HasKey(ft => new { ft.UserId, ft.TopicId });

            // Further configurations and seed data additions can be done here.

            base.OnModelCreating(modelBuilder);
        }

        // Configures the context to connect to a SQL Server database using the connection string
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
            }
        }
    }
}
