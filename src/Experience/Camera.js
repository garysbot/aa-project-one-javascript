import * as THREE from 'three'
import Experience from "./Experience";
import { PointerLockControls } from '/node_modules/three/examples/jsm/controls/PointerLockControls.js';

export default class Camera {
  constructor(){
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    

    this.setInstance();
    this.setControls();

    this.canvas.addEventListener( 'keydown', this.onKeyDown );
    this.canvas.addEventListener( 'keyup', this.onKeyUp );

  }

  setInstance(){
    this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 1, 1000) // ! -- Need Sizes class for here
    this.instance.position.set(1, 10, 20)
    this.scene.add(this.instance)
  }

  setControls(){
    this.controls = new PointerLockControls(this.instance, this.canvas)
  }

  onKeyDown(event){
    switch ( event.code ) {
      case 'ArrowUp':
        case 'KeyW':
          console.log(`ArrowUp/KeyW is working with event.code = ${event.code} via onKeyDown()`)
          moveForward = true;
          break;
      case 'ArrowLeft':
        case 'KeyA':
          console.log(`ArrowLeft/KeyA is working with event.code = ${event.code} via onKeyDown()`)
          moveLeft = true;
          break;    
      case 'ArrowDown':
        case 'KeyS':
          console.log(`ArrowDown/KeyS is working with event.code = ${event.code} via onKeyDown()`)
          moveBackward = true;
          break;
        
      case 'ArrowRight':
        case 'KeyD':
          console.log(`ArrowRight/KeyD is working with event.code = ${event.code} via onKeyDown()`)
          moveRight = true;
          break;
          
      case 'Space':
        if ( canJump === true ) velocity.y += 350;
        canJump = false;
        break; 
      }
  };
  
  onKeyUp(event){    
    switch ( event.code ) {
      case 'ArrowUp':
        case 'KeyW':
          console.log(`ArrowUp/KeyW is working with event.code = ${event.code} via onKeyUp()`)
          moveForward = false;
          break;
          
      case 'ArrowLeft':
        case 'KeyA':
          console.log(`ArrowLeft/KeyA is working with event.code = ${event.code} via onKeyUp()`)
          moveLeft = false;
          break;
        
      case 'ArrowDown':
        case 'KeyS':
        console.log(`ArrowDown/KeyS is working with event.code = ${event.code} via onKeyUp()`)
        moveBackward = false;
        break;
          
      case 'ArrowRight':
        case 'KeyD':
          console.log(`ArrowRight/KeyD is working with event.code = ${event.code} via onKeyUp()`)
          moveRight = false;
          break;
          
      }            
  };

  resize(){
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update(){
    this.controls.update()
  }

};