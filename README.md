# Blog Explorer Platform README

A platform for blog management and interaction.

Below you will find comprehensive instructions to get you started on a fresh Windows environment.

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- **Visual Studio 2022** (latest version) with the following workloads:
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
4. Run the project to start the server side of the platform.

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
   This command compiles the application, launches the development server, and opens the application in your default web browser.

## Conclusion

You should now have the Blog Explorer Platform running locally on your machine.
