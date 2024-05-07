using BlogExplorer.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BlogExp.WebSocket;
using BlogExp.WebSocket.Handlers;
using Microsoft.OpenApi.Models;

// Define a policy name for CORS settings
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
 builder.Services.AddControllers();

// Add Swagger/OpenAPI support for documenting your API and testing it via a UI
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."

    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
});

builder.Services.AddWebSocketManager();

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

// Configure authentication services.
builder.Services.AddAuthentication(x =>
{
    // Set the default authentication scheme.
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

    // Set the default challenge scheme
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(x =>
{
    // Disable the requirement for HTTPS - enables testing 
    x.RequireHttpsMetadata = false;

    // Enable saving the token in the authentication properties. Useful for accessing the token on subsequent requests.
    x.SaveToken = true;

    // Configure token validation parameters.
    x.TokenValidationParameters = new TokenValidationParameters
    {
        // Ensure that the issuer signing key is valid.
        ValidateIssuerSigningKey = true,

        // Set the issuer signing key with a symmetric security key based on a secret string.
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("9f74c1da7f6e8d3b4a5fa6b0cdee5f36f0934e4884fa2c3a5e6bdf5a80c0f2e1")),

        // Disable audience validation. This means the token can be considered valid regardless of the 'aud' claim.
        ValidateAudience = false,

        // Disable issuer validation. This means the token can be considered valid regardless of the 'iss' claim.
        ValidateIssuer = false,
        ValidateLifetime = true
    };
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

// Use Authentication middleware
app.UseAuthentication();

// Use Authorization middleware
app.UseAuthorization();

var serviceScopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();
var serviceProvider = serviceScopeFactory.CreateScope().ServiceProvider;
app.UseWebSockets();
app.MapWebSocketManager("/ws", serviceProvider.GetService<CommentHandler>());


// Map controller actions to their routes
app.MapControllers();

// Run the application
app.Run();
