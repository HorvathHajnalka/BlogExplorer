# Blog Explorer Platform README

## Overview
This prototype WebApplication is designed for managing blog posts, enabling users to interact with topics and comments within a server-client architecture, communicating through an RESTful APIs. The system has features such as database integration, authentication, and real-time communication.

## Technologies Used
- **Programming Language:** C# .NET
- **Web Framework:** ASP.NET
- **Frontend Framework:** Angular 17
- **Styling Framework:** Bootstrap v5.3
- **API Documentation:** Swagger
- **Database:** MS SQL Sever
- **Database Management:** Entity Framework for migrations

## Key Features
- **Authentication & Authorization:** Access to the system requires user authentication, which is managed through the use of JSON Web Tokens (JWT). This ensures secure and scalable user sessions.
- **Topic Interaction:** Users can view, filter, add to favorites and select topics to see or add comments.
- **Notification System:** The system notifies users of new comments on topics they follow.
- **Real-Time Communication:** Utilizes Websockets to deliver updates to users instantaneously.

## Getting started

Before you begin, ensure you have the following software installed on your system:

- **Visual Studio** (latest version) with the following workloads:
  - ASP.NET and web development
  - Azure development
  - Node.js development
  - .NET desktop development
- **Visual Studio Code**
- **Node.js**
- **Git**

## Installation

### Windows Command Prompt

Open your Windows Command Prompt as Administrator and execute the following commands to install global packages:

1. Install TypeScript:
   ```
   npm install -g typescript
   ```
2. Install Angular CLI:
   ```
   npm install -g @angular/cli
   ```

### Visual Studio

Within Visual Studio, you will need to install the following NuGet packages for your project:

- `Microsoft.EntityFrameworkCore.SqlServer`
- `Microsoft.EntityFrameworkCore.Tools`
- `Microsoft.EntityFrameworkCore.Design`
- `Microsoft.VisualStudio.Web.CodeGeneration.Design`
- `Microsoft.AspNet.WebApi.Core`
- `Microsoft.AspNetCore.Authentication.JwtBearer`

## Operation

To get your environment up and running, follow these steps:

### Server Side

1. Clone the git repository to your local machine.
2. Open Visual Studio and navigate to your local repository.
3. Open the `.sln` file to load the project.
4. Before running the project, it's crucial to update the database. In Visual Studio, open the **Package Manager Console** and execute the following command for database migration:
   ```
   dotnet ef database update
   ```
5. Now, run the project to start the server side of the platform.

### Client Side

1. Open Visual Studio Code and navigate to your local repository.
2. Open a new terminal within Visual Studio Code.
3. To bypass the execution policy for the current session, execute:
   ```
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```
4. Navigate to the Angular project directory:
   ```
   cd .\Client
   ```
5. Add Angular Material to your project:
   ```
   ng add @angular/material
   ```
6. Install Auth0 Angular JWT:
   ```
   npm install @auth0/angular-jwt
   ```
7. Start the Angular development server:
   ```
   ng serve --open
   ```
  This command compiles the client on port 4200, launches the development server on port 7111, and opens the application in your default web browser. Please note that the application is configured to only work on port 4200 and 7111.

## Conclusion

You should now have the Blog Explorer Platform running locally on your machine.




