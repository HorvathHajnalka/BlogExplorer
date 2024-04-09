using Microsoft.EntityFrameworkCore.Migrations;

namespace BlogExplorer.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP TABLE IF EXISTS [comments]");
            migrationBuilder.Sql("DROP TABLE IF EXISTS [favorite_topics]");
            migrationBuilder.Sql("DROP TABLE IF EXISTS [users]");
            migrationBuilder.Sql("DROP TABLE IF EXISTS [topics]");
            migrationBuilder.Sql("DROP TABLE IF EXISTS [topic_types]");

            // Users table
            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(maxLength: 255, nullable: true),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    password = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                });

            // Topics table
            migrationBuilder.CreateTable(
                name: "topics",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    type_id = table.Column<int>(nullable: false),
                    description = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_topics", x => x.id);
                });

            // Favorite Topics table
            migrationBuilder.CreateTable(
                name: "favorite_topics",
                columns: table => new
                {
                    user_id = table.Column<int>(nullable: false),
                    topic_id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_favorite_topics_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_favorite_topics_topics_topic_id",
                        column: x => x.topic_id,
                        principalTable: "topics",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            // Topic Types table
            migrationBuilder.CreateTable(
                name: "topic_types",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_topic_types", x => x.id);
                });

            // Comments table
            migrationBuilder.CreateTable(
                name: "comments",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(nullable: false),
                    topic_id = table.Column<int>(nullable: false),
                    body = table.Column<string>(maxLength: 255, nullable: true),
                    timestamp = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comments", x => x.id);
                    table.ForeignKey(
                        name: "FK_comments_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_comments_topics_topic_id",
                        column: x => x.topic_id,
                        principalTable: "topics",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            // filling with test data

            // Users
            migrationBuilder.Sql("INSERT INTO users (username, name, password) VALUES ('user1', 'User One', 'password1')");
            migrationBuilder.Sql("INSERT INTO users (username, name, password) VALUES ('user2', 'User Two', 'password2')");
            migrationBuilder.Sql("INSERT INTO users (username, name, password) VALUES ('user3', 'User Three', 'password3')");

            // Topic Types
            migrationBuilder.Sql("INSERT INTO topic_types (name) VALUES ('Technology')");
            migrationBuilder.Sql("INSERT INTO topic_types (name) VALUES ('Science')");
            migrationBuilder.Sql("INSERT INTO topic_types (name) VALUES ('Art')");

            // Topics
            migrationBuilder.Sql("INSERT INTO topics (name, type_id, description) VALUES ('Artificial Intelligence', 1, 'Everything about AI')");
            migrationBuilder.Sql("INSERT INTO topics (name, type_id, description) VALUES ('Quantum Computing', 2, 'The future of computing')");
            migrationBuilder.Sql("INSERT INTO topics (name, type_id, description) VALUES ('Renaissance Art', 3, 'Exploring art from the Renaissance period')");

            // Favorite Topics
            migrationBuilder.Sql("INSERT INTO favorite_topics (user_id, topic_id) VALUES (1, 1)");
            migrationBuilder.Sql("INSERT INTO favorite_topics (user_id, topic_id) VALUES (2, 2)");
            migrationBuilder.Sql("INSERT INTO favorite_topics (user_id, topic_id) VALUES (3, 3)");

            // Comments
            migrationBuilder.Sql("INSERT INTO comments (user_id, topic_id, body, timestamp) VALUES (1, 1, 'Really interesting topic!', '2023-01-01T12:00:00')");
            migrationBuilder.Sql("INSERT INTO comments (user_id, topic_id, body, timestamp) VALUES (2, 2, 'Can''t wait to see where this goes.', '2023-01-02T13:00:00')");
            migrationBuilder.Sql("INSERT INTO comments (user_id, topic_id, body, timestamp) VALUES (3, 3, 'Such beautiful art!', '2023-01-03T14:00:00')");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comments");
            migrationBuilder.DropTable(
                name: "favorite_topics");
            migrationBuilder.DropTable(
                name: "topic_types");
            migrationBuilder.DropTable(
                name: "users");
            migrationBuilder.DropTable(
                name: "topics");
        }
    }
}