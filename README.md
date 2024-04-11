# Blog Explorer Platform README

## Overview
This prototype WebApplication is designed for managing blog posts, enabling users to interact with topics and comments within a server-client architecture, communicating through an API. The system has features such as database integration, authentication, and real-time communication.

## Technologies Used
- **Programming Language:** C# .NET
- **Web Framework:** ASP.NET
- **Frontend Framework:** Angular
- **API Documentation:** Swagger
- **Database:** MS SQL Sever
- **Database Management:** Entity Framework for migrations
- **Real-Time Communication:** Websocket

## Key Features
- **Authentication:** Access to the system requires user authentication.
- **Topic Interaction:** Users can view, filter, and select topics to see or add comments.
- **Personalized Topic List:** Users can view a list of topics they have interacted with.
- **Notification System:** The system notifies users of new comments on topics they follow.
- **Real-Time Updates:** Leveraging Websockets, the system provides real-time updates to users


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
   cd .\angular17-blogexplorer-api
   ```
5. Start the Angular development server:
   ```
   ng serve --open
   ```
  This command compiles the application on port 4200, launches the development server, and opens the application in your default web browser. Please note that the application is configured to only work on port 4200.

## Conclusion

You should now have the Blog Explorer Platform running locally on your machine.




