# Artifact Adventure

Artifact Adventure is a dynamic Three.js demo that transforms curated art from The Met Museum's API into immersive 3D experiences within your web browser.

## Functionality
In Artifact Adventure, users will be able to:
- Navigate the virtual museum using WASD keys while under-the-hood Three.js re-renders the Camera object in real-time.
- Pointer-lock controls allow users to use their mouse to pan, rotate, and view their environment in first-person POV.
- Render different virtual environments instantly.
- Lighting, shadows, textures, and reflections respond to their virtual environments in real-time.
- View artwork from The Met Museum API rendered in 3D.

## Technologies, Libraries, APIs
- Node.js
- Three.js
- lil-gui
- Vite
- HTML5 & CSS
- Blockade Labs Skybox AI
- Sketchfab
- DALL-E 3
- The Metropolitan Museum of Art Collection API


## Implementation Timeline
### TH 10/19
- ✅ Researching 2D & 3D libraries, frameworks, and workflows.
- ✅ Write pseudo-code structure for creating a room environment in both 2D and 3D to understand tradeoffs.

### F 10/20
- ✅ Decision on 2D or 3D -> 3D direction decided.
- ✅ Identified Three.js class objects & inheritance chains for overall application.
- ✅ Identified Three.js camera and camera controllers necessary to update a user's "physical position" in response to their WASD key inputs.
- ✅ Build bare bones MVP room environment; responsive & full-screen.

### SA 10/21
- ✅ Develop user movement functionality to move throughout the room with WASD keys.
- ✅ Ensure camera and animating loops continue to follow character's POV/FOV.
- ✅ Added lil-gui for UI debugging.
- ✅ Testing Met Museum API.

### SU 10/22
- ✅ Implement environment mapping into bare-bones MVP room environment.
- ✅ Add lighting, shadows, reflections; update positioning of temporary room objects.
- ✅ Add pointer-lock controls to allow user to pan, rotate, view with their mouse in first-person POV.

### M 10/23
- ✅ Add floor geometry and accompanied textures.
- ✅ Add Met Museum artwork objects.
- ✅ Add additional environment map designs.
- ✅ Add art geometry, mesh, and objects to contain Met Museum art.

### T 10/24
- ✅ Testing, debugging, refactoring code.

### W 10/25
- ✅ Testing, debugging, refactoring code.
- ✅ Add ability to update environment map, floor texture, lighting and environment settings via modal.
- ✅ Add loading/pause screen; welcome/about description; user-control instructions; personal links; favicon.

### TH 10/26
- ✅ Testing, debugging, refactoring code.
- ✅ Writing production readme.

## Production README
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