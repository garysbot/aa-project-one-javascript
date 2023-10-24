import * as THREE from 'three';
import Experience from '../Experience.js'

export default class Environment{
  constructor(){
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;

    if(this.debug.active){
      this.debugFolder = this.debug.ui.addFolder('environment');
    }

    this.setLight();
  };

  setLight(){
    this.light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 2.5);
    this.light.position.set( 0.5, 1, 0.75 );
    this.scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
    this.scene.add(this.light);

    if (this.debug.active){
      this.debugFolder
        .add(this.light, 'myString')
        .name('skyColor')
    }
  };

  setEnvironmentMap(){
    const textureLoader = new THREE.TextureLoader();
    this.environmentMap = textureLoader.load('https://i.ibb.co/Ssmd3tG/Anime-Sky.png');
    this.environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    this.environmentMap.colorSpace = THREE.SRGBColorSpace;
    this.scene.background = this.environmentMap;

    // this.environmentMap = {}
    // this.environmentMap.texture = this.resources.items.environmentMapTexture
    // this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace
    
    // this.scene.environment = this.environmentMap.texture

    // this.environmentMap.updateMaterials = () =>
    // {
    //     this.scene.traverse((child) =>
    //     {
    //         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
    //         {
    //             child.material.envMap = this.environmentMap.texture
    //             child.material.envMapIntensity = this.environmentMap.intensity
    //             child.material.needsUpdate = true
    //         }
    //     })
    // }
    // this.environmentMap.updateMaterials()

    // // Debug
    // if(this.debug.active)
    // {
    //     this.debugFolder
    //         .add(this.environmentMap, 'intensity')
    //         .name('envMapIntensity')
    //         .min(0)
    //         .max(4)
    //         .step(0.001)
    //         .onChange(this.environmentMap.updateMaterials)
    // }
  }
  

};