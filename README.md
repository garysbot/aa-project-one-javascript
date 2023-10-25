# aA Project #1: JavaScript

## Background
Artifact Adventure is an interactive digital museum that you can browse with your WASD keys. 
Entering a gallery and clicking on an artwork displays information about the art.


## Functionality & MVPs
In Artifact Adventure, users will be able to:
- Move throughout the digital museum with the WASD keys; three.js Camera object mutates as user hits WASD directional keys.
- Loading screen and start button.
- Integration with The Met Museum API to display data about each artwork from artist, medium, culture, and age of the art; displays via modal window when user engaged with an artwork.
- Enter a gallery room from a mezzanine starting area and gallery renders.
- Ability to exit artwork viewing; exit gallery; exit game.

In addition this project will include:
- Instructions on how to interact with the game.
- README explaining technology and their role/functionality in the program.
- [Reach Feature] Upload your own art and see it hung on the gallery wall.
- [Reach Feature] Different music in each gallery room.


## Wireframes
### [01] Loading Screen
![plot](https://github.com/garysbot/aa-project-one-javascript/blob/main/wireframes/1.png)

### [02] Opening Scene
![Wireframe 02](https://github.com/garysbot/aa-project-one-javascript/blob/main/wireframes/2.png)

### [03] Entering a Gallery
![Wireframe 03](https://github.com/garysbot/aa-project-one-javascript/blob/main/wireframes/3.png)

### [04] Looking at Art
![Wireframe 04](https://github.com/garysbot/aa-project-one-javascript/blob/main/wireframes/4.png)

### [05] Engaging with Art
![Wireframe 05](https://github.com/garysbot/aa-project-one-javascript/blob/main/wireframes/5.png)


## Technologies, Libraries, APIs
- Three.js
- GSAP 
- lil-gui
- Pixi.js
- Node.js
- Webpack / Vite
- HTML5 & CSS
- Vercel
- The Metropolitan Museum of Art Collection API


## Implementation Timeline
### TH 10/19
- ✅ Identified three.js class objects & inheritance chains for overall game.
- ✅ Identified three.js camera and camera controllers necessary to update a user's "physical position" in response to their WASD key inputs.
- ✅ Implemented responsive full-screen experience compatible with desktop, tablet, and mobile. Ability to enter & exit fullscreen with doubleclick & doubletap.
- ✅ Added lil-gui for UI debugging.
- ☑️ Plan simple code structure for creating a room environment in 2D and 3D.
- ☑️ Researching 2D & 3D libraries, frameworks, and workflows.

### F 10/20
- ☑️ Further research on 2D & 3D to decide direction.
- ☑️ Build bare bones MVP room environment.
- ☑️ Research Met Museum API and desired artwork data to display to users.

### SA 10/21
- ☑️ Develop user movement functionality to move throughout the room with WASD keys.
- ☑️ Ensure camera and animating loops continue to follow character's POV/FOV.


### SU 10/22
- ☑️ Integrate the Met Museum API to display API data inside of the console of the program.
- ☑️ Add art frame object groups to gallery environment walls.
- ☑️ Build MVP modal to display text on the wall next to the image.

### M 10/23
- ☑️ User movement, displaying art, and displaying art data is functional but perhaps not fully integrated.
- ☑️ Begin integrating the art images and art data modals into the room environment.

### T 10/24
- ☑️ Begin work on a loading screen.
- ☑️ Build a second room environment that serves as a corridor of other gallery rooms.

### W 10/25
- ☑️ Integrate the loading screen, corridor, and first gallery together.
- ☑️ Testing.

### TH 10/26
- ☑️ Writing production readme.


## Checklist
### Live Project
- Includes links to your portfolio website, Github, and LinkedIn.
- Landing page/modal with obvious, clear instructions.
- Interactivity of some kind.
- Well styled, clean frontend.
- If it has music, the option to mute or stop it.

### Production README
- Link to live version.
- Instructions on how to play/interact with the project.
- List of technologies / libraries / APIs used.
- Technical implementation details with (good-looking) code snippets.
- To-dos / future features.
- No .DS_Store files / debuggers / console.logs.
- Organized file structure, with /src and /dist directories.

<br>

## Technical Implementation
### Classes
- Sizes
- sources
- Debug
- Floor
- World
- Environment
- Resources
- Renderer
- Camera