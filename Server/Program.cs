using BlogExplorer.Data;
using Microsoft.EntityFrameworkCore;

// Define a policy name for CORS settings
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
 builder.Services.AddControllers();

// Add Swagger/OpenAPI support for documenting your API and testing it via a UI
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the DbContext with SQL Server using the connection string from app settings
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});



// Configure CORS (Cross-Origin Resource Sharing) settings
builder.Services.AddCors(options =>
{
    // Define a CORS policy with specific settings
    options.AddPolicy(name: myAllowSpecificOrigins,
        builder =>
        {
            // Allow requests from the specified origin
            // builder.WithOrigins("http://localhost:4200")
            // Allow any origin
            builder.AllowAnyOrigin()
            // Allow any HTTP method (GET, POST, PUT, etc.)
            .AllowAnyMethod()
            // Allow any header to be sent in requests
            .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline, especially for development environment
if (app.Environment.IsDevelopment())
{
    // Enable middleware to serve generated Swagger as a JSON endpoint
    app.UseSwagger();
    // Enable middleware to serve swagger-ui
    app.UseSwaggerUI();
}

// Enable HTTPS redirection to redirect HTTP requests to HTTPS
app.UseHttpsRedirection();

// Apply the CORS policy to the app
app.UseCors(myAllowSpecificOrigins);

// Use Authorization middleware
app.UseAuthorization();

// Map controller actions to their routes
app.MapControllers();

// Run the application
app.Run();
