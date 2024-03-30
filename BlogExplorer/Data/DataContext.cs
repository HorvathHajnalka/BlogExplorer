using Microsoft.EntityFrameworkCore;

namespace BlogExplorer.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<users> users { get; set; }


    }
}
