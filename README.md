# BlogExplorer
A platform for blog management and interaction.
Instrukciók friss Windows-ra:
Letölteni:
    •	Visual Studio 2022 legfrissebb verziója az alábbi csomagokkal:
        o	ASP.NET and web development
        o	Azure development
        o	Node.js development
        o	.NET desktop development
    •	Visual Studio Code
    •	Node JS
    •	Git
    •	GitHub Desktop
Windows parancssoron keresztül telepíteni:
    •	npm install -g typescript
    •	npm install -g @angular/cli
Működtetéshez:
git repository klónozását követően:
    szerveroldal:
        Visual Studio-ban a local repository-t megnyitni, az sln fájlt megnyitni majd futtatni
    kliens oldal: 
        Visual Studio Code-ban a local repository-t megnyitni, új terminált nyitni, és abba írni:
        •	Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
        •	cd .\angular17-blogexplorer-api\
        •	ng serve --open
