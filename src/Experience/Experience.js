import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resources from './Utils/Resources.js';

import sources from './sources.js';

let instance = null

let prevTime = performance.now();         // ^ Incomplete -- Needed for animate
const velocity = new THREE.Vector3();     // ^ Incomplete
const direction = new THREE.Vector3();    // ^ Incomplete -- Needed for animate

export default class Experience{
  // ** Good to go ----------------------------------------
  constructor(_canvas){
    console.log('SUCCESS: Experience Class Intialized')
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
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World();

    this.instructionOverlay();
    // this.animate();

    this.sizes.on('resize', () => {
      this.renderer.resize()
    })

    this.time.on('tick', () => {
      this.update();
    })

  }

  update = () => {
    // console.log('PENDING: Experience.update() invoked')
    requestAnimationFrame( this.update );
    const time = performance.now();

    if ( this.camera.controls.isLocked === true ) {
      const delta = ( time - prevTime ) / 1000;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      direction.z = Number( this.camera.moveForward ) - Number( this.camera.moveBackward );
      // console.log(`Moving in direction.z: ${direction.z}`)
      direction.x = Number( this.camera.moveRight ) - Number( this.camera.moveLeft );
      // console.log(`Moving in direction.x: ${direction.x}`)
      direction.normalize(); // this ensures consistent movements in all directions

      if ( this.camera.moveForward || this.camera.moveBackward ) velocity.z -= direction.z * 400.0 * delta;
      if ( this.camera.moveLeft || this.camera.moveRight ) velocity.x -= direction.x * 400.0 * delta;

      this.camera.controls.moveRight( - velocity.x * delta );
      this.camera.controls.moveForward( - velocity.z * delta );

      this.camera.controls.getObject().position.y += ( velocity.y * delta ); // new behavior

      if ( this.camera.controls.getObject().position.y < 10 ) {

        velocity.y = 0;
        this.camera.controls.getObject().position.y = 10;

      }

    }

    prevTime = time;
    // console.log(this.renderer);
    // console.log(this.renderer instanceof THREE.WebGLRenderer);

    this.renderer.instance.render( this.scene, this.camera.instance );


    this.renderer.update();
  }


  // ** Good to go ----------------------------------------
  instructionOverlay(){
    // console.log('SUCCESS: Experience:instructionOverlay() Invoked')
    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    // ~ Event Listeners to allow users to pause & resume game w/ Instructions page as the pause screen
    instructions.addEventListener( 'click', () => {
      this.camera.controls.lock();
    });
  
    this.camera.controls.addEventListener( 'lock', () => {
      instructions.style.display = 'none';
      blocker.style.display = 'none';
    });
  
    this.camera.controls.addEventListener( 'unlock', () => {
      blocker.style.display = 'block';
      instructions.style.display = '';
    });
  
    this.scene.add( this.camera.controls.getObject() );
  };

};