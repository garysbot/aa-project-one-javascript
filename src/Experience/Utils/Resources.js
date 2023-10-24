import * as THREE from 'three'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter{
    constructor(sources){
      // console.log(`SUCCESS: Resources Class Initialized`);
      super()

      this.sources = sources
      this.items = {}
      this.toLoad = this.sources.length
      this.loaded = 0

      this.setLoaders()
      this.startLoading()
    }

    setLoaders(){
        // console.log(`PENDING: Resources.setLoaders() Invoked`);
        this.loaders = {}
        // this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
        console.log(`COMPLETE: Resources.setLoaders() Invoked`);
    }

    startLoading(){
      // console.log(`PENDING: Resources.startLoading() Invoked`);
      // Load each source
      for(const source of this.sources){
        // console.log(source);
        if(source.type === 'texture'){
          this.loaders.textureLoader.load(
            source.path,
            (file) =>{
              this.sourceLoaded(source, file)
            }
          )
        }
        else if(source.type === 'cubeTexture'){
          this.loaders.cubeTextureLoader.load(
            source.path,
            (file) =>{
              this.sourceLoaded(source, file)
            }
          )
        };
      };
      console.log(`COMPLETE: Resources.startLoading() Invoked`);
    };

    sourceLoaded(source, file){
      // console.log(`PENDING: Resources.sourceLoaded() Invoked`);
      this.items[source.name] = file

      this.loaded++

      if(this.loaded === this.toLoad)
      {
          this.trigger('ready')
      }
      console.log(`COMPLETE: Resources.sourceLoaded() Invoked`)
    }
}