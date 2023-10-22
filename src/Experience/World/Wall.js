import * as THREE from 'three';
import Experience from '../Experience';

export default class Wall {
  constructor(){
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Setup
    this.setBackground();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setBackground(){
    const textureLoader = new THREE.TextureLoader()
    const environmentMap = textureLoader.load('textures/environmentMap/skylabs-test.jpg')
    environmentMap.mapping = THREE.EquirectangularReflectionMapping
    environmentMap.colorSpace = THREE.SRGBColorSpace

    scene.background = environmentMap
  }

}