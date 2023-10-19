import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from '../node_modules/three/examples/jsm/controls/PointerLockControls.js';
import gsap from 'gsap';
import * as dat from 'lil-gui';

// Color Fixer
THREE.ColorManagement.enabled = false

/**
 * Textures
*/

// Texture Image
const textureTestOne = '/texture-test-one.png'

// TextureLoader - convert image into texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(textureTestOne);
// Reduces the weird pixelation when texture pixel is smaller than render pixel - first line improves performance since we are using THREE.NearestFilter
texture.generateMipmaps = false
texture.minFilter = THREE.NearestFilter;

// Reduces bad pixelation when texture pixel is > render pixel
texture.magFilter = THREE.NearestFilter;

// Combination of repeat & wrap to wrap texture more accurately
// texture.repeat.x = 2
// texture.repeat.y = 3
// texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.RepeatWrapping

// Parameter variables for GUI Color
const parameters = {
    color: 0xff0000,
    
    // adding a spin property function that animates the cube
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }

}

// ----------------------------------------------------------------------------------------------- //

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    // width: 800,
    // height: 600
    // Updating to window.innerWidth & window.innerHeight makes it fullscreen
    width: window.innerWidth,
    height: window.innerHeight
}

// ----------------------------------------------------------------------------------------------- //

/**
 * Object
 */

// // Test Cube
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ map: texture })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// Museum Container
const museum = new THREE.Group();
scene.add(museum);


const museumWalls = new THREE.Mesh(
    new THREE.BoxGeometry(5, 10, 4),
    new THREE.MeshStandardMaterial( { color: '#AC8E82'})
);

museumWalls.position.y = 1.25
museum.add(museumWalls);

const museumFloors = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 10),
    new THREE.MeshStandardMaterial({ color: 0xffff00, side: THREE.DoubleSide })
);

museumWalls.position.y = 0
museumWalls.position.z = 2
museumFloors.position.z = 0

museum.add(museumFloors);

// ----------------------------------------------------------------------------------------------- //

/**
 * Lighting
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);


// ----------------------------------------------------------------------------------------------- //


/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = -10
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


// ----------------------------------------------------------------------------------------------- //

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)

// ----------------------------------------------------------------------------------------------- //


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

// Animates it all
tick()

// ----------------------------------------------------------------------------------------------- //

/**
 * Event Listeners
 */

// Window Resizing
window.addEventListener('resize', () => {
    // console.log('window has been resized')

    // Updating window width & height according to resize
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update the camera AR
    camera.aspect = sizes.width / sizes.height;
    // Required when updating aspect
    camera.updateProjectionMatrix();
    // Required as well
    renderer.setSize(sizes.width, sizes.height)
    // Standardizing pixel ratio to 2 to resolve aliasing issue
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

// Double-Click to Fullscreen
window.addEventListener('dblclick', ()=> {
    // console.log('double click');

    // Conditionals to account for Safari functionality
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    // are we currently in fullscreen?
    if (!fullscreenElement){
        // go fullscreen; call it on the canvas
        // console.log('go fullscreen');
        if (canvas.requestFullscreen){
            canvas.requestFullscreen();
        } else if (canvas.webkitFullscreenElement){
            canvas.webkitRequestFullscreen();
        }
    } else {
        // exit fullscreen
        // console.log('exit fullscreen');
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen;
        }
        
    }

})


// ----------------------------------------------------------------------------------------------- //



/**
 * Debug
 */
// Adds the GUI panel to the program
const gui = new dat.GUI();
// Adds specific elements into GUI panel to allow users to modify
gui
.add(mesh.position, 'y')
.min(-3)
.max(3)
.step(0.01)
.name('Elevation')

// Enable/disable wireframe in GUI
gui
.add(material, 'wireframe')
.name('Wireframe')

// Change color feature in GUI
gui
.addColor(parameters, 'color')
.onChange(() => {
    material.color.set(parameters.color)
})

// Spin feature in GUI
gui
.add(parameters, 'spin')

gui
.add(camera.position, 'x')
.min(0)
.max(0)
.name('Reset Camera X')

