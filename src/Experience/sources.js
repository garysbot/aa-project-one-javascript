export default [
  {
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path: [
      'textures/environmentMap/px.jpg',
      'textures/environmentMap/nx.jpg',
      'textures/environmentMap/py.jpg',
      'textures/environmentMap/ny.jpg',
      'textures/environmentMap/pz.jpg',
      'textures/environmentMap/nz.jpg'
      // 'textures/environmentMap/skylabs-test.jpg'
    ]
  },
  {
    name: 'equirectangularTexture',
    type: 'texture',
    path: [
      'textures/environmentMap/skylabs-test.jpg'
    ]
  },
  {
    // Primary texture file here
    name: 'grassColorTexture',
    type: 'texture',
    // path: 'textures/dirt/color.jpg'
    // path: 'textures/marbleTestV1/marble.jpg'
    path: 'textures/marbleTestV2/color.png'
  },
  {
    // Secondary normal map texture to add detail on top
    name: 'grassNormalTexture',
    type: 'texture',
    path: 'textures/dirt/normal.jpg'
    // path: 'textures/marbleTestV2/normal.png'
  },
  {
    name: 'foxModel',
    type: 'gltfModel',
    path: 'models/Fox/glTF/Fox.gltf'
  }
]