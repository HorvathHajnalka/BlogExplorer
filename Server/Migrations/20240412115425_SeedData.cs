﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insert TopicTypes
            migrationBuilder.Sql("INSERT INTO TopicTypes (Name) VALUES ('Technology')");
            migrationBuilder.Sql("INSERT INTO TopicTypes (Name) VALUES ('Science')");
            migrationBuilder.Sql("INSERT INTO TopicTypes (Name) VALUES ('Health')");
            migrationBuilder.Sql("INSERT INTO TopicTypes (Name) VALUES ('Education')");

            // Insert Users
            migrationBuilder.Sql("INSERT INTO Users (Username, Name, Password) VALUES ('johndoe', 'John Doe', 'password1')");
            migrationBuilder.Sql("INSERT INTO Users (Username, Name, Password) VALUES ('janedoe', 'Jane Doe', 'password2')");
            migrationBuilder.Sql("INSERT INTO Users (Username, Name, Password) VALUES ('admin', 'Admin Arnold', 'admin')");
            migrationBuilder.Sql("INSERT INTO Users (Username, Name, Password) VALUES ('user', 'User Ursula', 'user')");

            // Insert Topics
            migrationBuilder.Sql("INSERT INTO Topics (Name, TopicTypeId, Description) VALUES ('Artificial Intelligence', (SELECT TopicTypeId FROM TopicTypes WHERE Name = 'Technology'), 'Discussion about AI advancements')");
            migrationBuilder.Sql("INSERT INTO Topics (Name, TopicTypeId, Description) VALUES ('News in the Tech Industry', (SELECT TopicTypeId FROM TopicTypes WHERE Name = 'Technology'), 'Discussion about the latest news in Tech')");
            migrationBuilder.Sql("INSERT INTO Topics (Name, TopicTypeId, Description) VALUES ('Quantum Physics', (SELECT TopicTypeId FROM TopicTypes WHERE Name = 'Science'), 'Exploring quantum mechanics')");
            migrationBuilder.Sql("INSERT INTO Topics (Name, TopicTypeId, Description) VALUES ('Nutrition Facts', (SELECT TopicTypeId FROM TopicTypes WHERE Name = 'Health'), 'Diet and nutritional information')");

            // Insert Comments
            migrationBuilder.Sql("INSERT INTO Comments (UserId, TopicId, Body, Timestamp) VALUES ((SELECT UserId FROM Users WHERE Username = 'johndoe'), (SELECT TopicId FROM Topics WHERE Name = 'Artificial Intelligence'), 'Very informative, thanks!', GETDATE())");
            migrationBuilder.Sql("INSERT INTO Comments (UserId, TopicId, Body, Timestamp) VALUES ((SELECT UserId FROM Users WHERE Username = 'janedoe'), (SELECT TopicId FROM Topics WHERE Name = 'Artificial Intelligence'), 'This is amazing!', GETDATE())");
            migrationBuilder.Sql("INSERT INTO Comments (UserId, TopicId, Body, Timestamp) VALUES ((SELECT UserId FROM Users WHERE Username = 'janedoe'), (SELECT TopicId FROM Topics WHERE Name = 'Quantum Physics'), 'Absolutely fascinating!', GETDATE())");

            // Insert FavoriteTopics
            migrationBuilder.Sql("INSERT INTO FavoriteTopics (UserId, TopicId) VALUES ((SELECT UserId FROM Users WHERE Username = 'johndoe'), (SELECT TopicId FROM Topics WHERE Name = 'Nutrition Facts'))");
            migrationBuilder.Sql("INSERT INTO FavoriteTopics (UserId, TopicId) VALUES ((SELECT UserId FROM Users WHERE Username = 'janedoe'), (SELECT TopicId FROM Topics WHERE Name = 'Artificial Intelligence'))");
            migrationBuilder.Sql("INSERT INTO FavoriteTopics (UserId, TopicId) VALUES ((SELECT UserId FROM Users WHERE Username = 'janedoe'), (SELECT TopicId FROM Topics WHERE Name = 'News in the Tech Industry'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Delete from FavoriteTopics
            migrationBuilder.Sql("DELETE FROM FavoriteTopics WHERE UserId IN (SELECT UserId FROM Users WHERE Username IN ('johndoe', 'janedoe'))");

            // Delete from Comments
            migrationBuilder.Sql("DELETE FROM Comments WHERE UserId IN (SELECT UserId FROM Users WHERE Username IN ('johndoe', 'janedoe'))");

            // Delete from Topics
            migrationBuilder.Sql("DELETE FROM Topics WHERE Name IN ('Artificial Intelligence', 'Quantum Physics', 'Nutrition Facts')");

            // Delete from Users
            migrationBuilder.Sql("DELETE FROM Users WHERE Username IN ('johndoe', 'janedoe')");

            // Delete from TopicTypes
            migrationBuilder.Sql("DELETE FROM TopicTypes WHERE Name IN ('Technology', 'Science', 'Health', 'Education')");
        }
    }
}