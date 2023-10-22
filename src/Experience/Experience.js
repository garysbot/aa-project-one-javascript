import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import World from './World/World.js';
import Resources from './Utils/Resources.js';
import sources from './sources.js';
import Debug from './Utils/Debug.js';

// Singleton
let instance = null;

export default class Experience
{
  constructor(canvas){
    // Singleton
    if(instance){
      return instance;
    }
    instance = this;

    // Testing
    // console.log('Hello heres the experience');
    
    // Global Access
    // window.experience = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Time Tick event
    this.time.on('tick', () => {
      this.update();
    })

    // Resize Event
    this.sizes.on('resize', () => {
      // Test
      // console.log('A resize has occurred');

      this.resize();
    });
  }

  update(){
    this.camera.update();
    this.world.update();
    this.renderer.update();
  };

  resize(){
    this.camera.resize();
    this.renderer.resize();
  };

};
