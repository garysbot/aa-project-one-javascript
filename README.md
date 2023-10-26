# Artifact Adventure
Artifact Adventure is a dynamic Three.js demo that transforms curated art from The Met Museum's API into an immersive 3D experience directly in your browser.

[Visit Artifact Adventure](https://garysbot.github.io/artifact-adventure/)<br>

![Artifact Adventure Environment GIF](static/readme/gifs/environment.gif)<br>

<br><br>

## Features
In Artifact Adventure, users:
- Navigate a first-person 3D virtual art exhibit with WASD and mouse controls.
- Render different virtual environments instantly.
- Lighting, shadows, textures, and reflections respond in real-time to their virtual environments.
- View artwork from The Met Museum API rendered in 3D.
<br><br>

## Instructions
Interacting with [Artifact Adventure](https://garysbot.github.io/artifact-adventure/) is easy and intuitive:
- ***Start*** the demo with a ***left-click*** on your mouse.
- ***Move*** around the 3D environment with your ***WASD*** keys.
- ***Look*** at your surroundings with your ***mouse***.
- ***Jump*** with the ***spacebar***.
- ***Pause*** the demo by pressing ***ESC***.
<br><br>

## Object-Oriented Design Principles
Each Three.js component handles a specific part of WebGL to render high-performance 3D graphics in your browser.

Artifact Adventure is composed of the following components:
- Camera
- Scene
- Lights
- Mesh Objects
- Environment Map
- Renderer

### The Experience
![Artifact Adventure Environment GIF](static/readme/gifs/environment.gif)<br>

The `Experience` class manages the complete experience by:
1. Accepting a HTML `canvas` DOM element as an argument,
2. Instantiating all necessary component classes and,
3. Handles persistent animation via a `requestAnimationFrame` loop.

```javascript
// Experience.js

constructor(_canvas){
    // Singleton
    if(instance){
      return instance
    }
    instance = this
  
    // Global access
    window.experience = this

    // Options
    this.canvas = _canvas

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time()
    this.scene = new THREE.Scene();
    this.camera = new Camera()
    this.environment = new Environment();
    this.renderer = new Renderer()

    this.time.on('tick', () => {
      this.update();
    })
    
  }
```

**Camera**<br>
  `camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );`<br>
  `camera.position.y = 10;`<br>
  `camera.position.z = 50;`


- Camera
- Scene
- Environment Map
- Lights

### The Objects
- Objects
- Floor
- Art Objects

### The Rendering
- Renderer
- WASD Controls
- PointerLock Controls
- Gravity

<br><br>

## Tech Stack
- Node.js
- Three.js
- lil-gui
- Vite
- HTML5 & CSS
- Blockade Labs Skybox AI
- Sketchfab
- DALL-E 3
- The Metropolitan Museum of Art Collection API

## Production README
- Technical implementation details with (good-looking) code snippets.
- To-dos / future features.
- No .DS_Store files / debuggers / console.logs.
- Organized file structure, with /src and /dist directories.