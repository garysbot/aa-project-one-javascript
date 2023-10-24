import * as THREE from 'three'
import Experience from "./Experience";
import { PointerLockControls } from '/node_modules/three/examples/jsm/controls/PointerLockControls.js';

export default class Camera {
  constructor(){
    // ** Good to go ----------------------------------------
    console.log('SUCCESS: Camera Class Initialized');
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.objects = [];
    this.raycaster;

    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.canJump = false;

    this.velocity = new THREE.Vector3();     // ^ Incomplete

    this.setInstance();
    this.setControls();

    document.addEventListener( 'keydown', this.onKeyDown );
    document.addEventListener( 'keyup', this.onKeyUp );

  }

  // ** Good to go ----------------------------------------
  setInstance(){
    console.log('SUCCESS: Camera:setInstance() Invoked')
    this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 1, 1000)
    this.instance.position.set(1, 10, 20)
    this.scene.add(this.instance)
  }

  // ** Good to go ----------------------------------------
  setControls(){
    console.log('SUCCESS: Camera:setControls() Invoked')
    this.controls = new PointerLockControls(this.instance, this.canvas)
  }

  // ** Good to go ----------------------------------------------
  onKeyDown = (event) => {
    console.log('SUCCESS: Camera:onKeyDown(event) Invoked');
    switch ( event.code ) {
      case 'ArrowUp':
        case 'KeyW':
          console.log(`ArrowUp/KeyW is working with event.code = ${event.code} via onKeyDown()`)
          // console.log(`this.moveForward: ${this.moveForward}`);
          this.moveForward = true;
          // console.log(`this.moveForward: ${this.moveForward}`);
          break;
      case 'ArrowLeft':
        case 'KeyA':
          console.log(`ArrowLeft/KeyA is working with event.code = ${event.code} via onKeyDown()`)
          this.moveLeft = true;
          break;    
      case 'ArrowDown':
        case 'KeyS':
          console.log(`ArrowDown/KeyS is working with event.code = ${event.code} via onKeyDown()`)
          this.moveBackward = true;
          break;
        
      case 'ArrowRight':
        case 'KeyD':
          console.log(`ArrowRight/KeyD is working with event.code = ${event.code} via onKeyDown()`)
          this.moveRight = true;
          break;
          
      case 'Space':
        if ( canJump === true ) velocity.y += 350;
        this.canJump = false;
        break; 
      }
  };

  // ** Good to go  ----------------------------------------------
  onKeyUp = (event) => {    
    console.log('SUCCESS: Camera:onKeyUp(event) Invoked');
    switch ( event.code ) {
      case 'ArrowUp':
        case 'KeyW':
          console.log(`ArrowUp/KeyW is working with event.code = ${event.code} via onKeyUp()`)
          this.moveForward = false;
          break;
          
      case 'ArrowLeft':
        case 'KeyA':
          console.log(`ArrowLeft/KeyA is working with event.code = ${event.code} via onKeyUp()`)
          this.moveLeft = false;
          break;
        
      case 'ArrowDown':
        case 'KeyS':
        console.log(`ArrowDown/KeyS is working with event.code = ${event.code} via onKeyUp()`)
        this.moveBackward = false;
        break;
          
      case 'ArrowRight':
        case 'KeyD':
          console.log(`ArrowRight/KeyD is working with event.code = ${event.code} via onKeyUp()`)
          this.moveRight = false;
          break;
          
      }            
  };

  resize(){
    console.log('SUCCESS: Camera:resize() Invoked')
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update(){
    console.log('SUCCESS: Camera:update() Invoked')
    this.controls.update()
  }

};