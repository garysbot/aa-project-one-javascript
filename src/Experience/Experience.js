import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';

let instance = null


let prevTime = performance.now();         // ^ Incomplete

const direction = new THREE.Vector3();    // ^ Incomplete

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
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World();

    this.instructionOverlay();
  }

  // ! Debug ----------------------------------------------
  resize(){
    console.log('SUCCESS: Experience:resize() Invoked')
    this.camera.resize()
    this.renderer.resize()
  }

  // ! Debug ----------------------------------------------
  update(){
    console.log('SUCCESS: Experience:update() Invoked')
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  // ** Good to go ----------------------------------------
  instructionOverlay(){
    console.log('SUCCESS: Experience:instructionOverlay() Invoked')
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