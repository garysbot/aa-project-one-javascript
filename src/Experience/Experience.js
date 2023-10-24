import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import World from './World/World.js'
import Camera from './Camera.js';

export default class Experience{
  constructor(){
    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.scene = new THREE.Scene();
    this.camera = new Camera()
    this.world = new World();

    this.instructionOverlay();
  }

  instructionOverlay(){
    const blocker = document.getElementById( 'blocker' );
    const instructions = document.getElementById( 'instructions' );

    // ~ Event Listeners to allow users to pause & resume game w/ Instructions page as the pause screen
    instructions.addEventListener( 'click', () => {
      this.camera.controls.lock();
    });
  
    controls.addEventListener( 'lock', () => {
      instructions.style.display = 'none';
      blocker.style.display = 'none';
    });
  
    controls.addEventListener( 'unlock', () => {
      blocker.style.display = 'block';
      instructions.style.display = '';
    });
  
    this.scene.add( this.camera.controls.getObject() );
  };

};