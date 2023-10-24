import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

// ! Setup ----------------------------------------------------------------------------------
// * Move to Experience class
let camera
let scene
let renderer
let controls

const objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

init();
animate();


// ! Main Experience -----------------------------------------------------------------------
function init() {
  // ^ Setup -------------------------------------------------------------------------------
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.y = 10;

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0xffffff, 0, 750 );


  // ^ EnvironmentMap Textures -------------------------------------------------------------
  const textureLoader = new THREE.TextureLoader();
  const environmentMap = textureLoader.load('https://i.ibb.co/Ssmd3tG/Anime-Sky.png');
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  environmentMap.colorSpace = THREE.SRGBColorSpace;
  scene.background = environmentMap;


  // ^ Lights ------------------------------------------------------------------------------
  const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 2.5 );
  light.position.set( 0.5, 1, 0.75 );
  scene.add( light );
  

  // ^ Controls ------------------------------------------------------------------------------
  controls = new PointerLockControls( camera, document.body );

  
  // ^ Game Instructions ---------------------------------------------------------------------
  const blocker = document.getElementById( 'blocker' );
  const instructions = document.getElementById( 'instructions' );
  
  // ~ Event Listeners to allow users to pause & resume game w/ Instructions page as the pause screen
  instructions.addEventListener( 'click', function () {
    
    controls.lock();
    
  } );
  
  controls.addEventListener( 'lock', function () {
    
    instructions.style.display = 'none';
    blocker.style.display = 'none';
    
  } );
  
  controls.addEventListener( 'unlock', function () {
    
    blocker.style.display = 'block';
    instructions.style.display = '';
    
  } );
  
  scene.add( controls.getObject() );
  

  // ^ User WASD Controls --------------------------------------------------------------------
  const onKeyDown = function ( event ) {
    switch ( event.code ) {
      case 'ArrowUp':
        case 'KeyW':
          // console.log(`ArrowUp/KeyW is working with event.code = ${event.code} via onKeyDown()`)
          moveForward = true;
          break;
      case 'ArrowLeft':
        case 'KeyA':
          // console.log(`ArrowLeft/KeyA is working with event.code = ${event.code} via onKeyDown()`)
          moveLeft = true;
          break;    
      case 'ArrowDown':
        case 'KeyS':
          // console.log(`ArrowDown/KeyS is working with event.code = ${event.code} via onKeyDown()`)
          moveBackward = true;
          break;
        
      case 'ArrowRight':
        case 'KeyD':
          // console.log(`ArrowRight/KeyD is working with event.code = ${event.code} via onKeyDown()`)
          moveRight = true;
          break;
          
      case 'Space':
        if ( canJump === true ) velocity.y += 350;
        canJump = false;
        break; 
      }
  };
  
  const onKeyUp = function ( event ) {    
    switch ( event.code ) {
      case 'ArrowUp':
        case 'KeyW':
          // console.log(`ArrowUp/KeyW is working with event.code = ${event.code} via onKeyUp()`)
          moveForward = false;
          break;
          
      case 'ArrowLeft':
        case 'KeyA':
          // console.log(`ArrowLeft/KeyA is working with event.code = ${event.code} via onKeyUp()`)
          moveLeft = false;
          break;
        
      case 'ArrowDown':
        case 'KeyS':
        // console.log(`ArrowDown/KeyS is working with event.code = ${event.code} via onKeyUp()`)
        moveBackward = false;
        break;
          
      case 'ArrowRight':
        case 'KeyD':
          // console.log(`ArrowRight/KeyD is working with event.code = ${event.code} via onKeyUp()`)
          moveRight = false;
          break;
          
      }            
  };
            
  document.addEventListener( 'keydown', onKeyDown );
  document.addEventListener( 'keyup', onKeyUp );
  raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
  

  // ^ Art Objects -----------------------------------------------
  const artTexture = textureLoader.load('./art/dt4855.jpg')
  // console.log(artTexture);
  const artGeometry = new THREE.PlaneGeometry(50, 50);
  const artMaterial = new THREE.MeshBasicMaterial( { map: artTexture, side: THREE.DoubleSide });
  const art = new THREE.Mesh( artGeometry, artMaterial );
  art.position.y = 25;
  scene.add( art );
  

  // ^ Floor -----------------------------------------------------
  let floorGeometry = new THREE.CircleGeometry( 100, 64, 0, 2 * Math.PI );
  floorGeometry.rotateX( - Math.PI / 2 );
  const floorTexturePathURL = 'https://i.ibb.co/VqxZ4WR/color.jpg';
  const floorTexture = textureLoader.load(floorTexturePathURL);
  floorTexture.repeat.set(20, 20);
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  const floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture } );

  const floor = new THREE.Mesh( floorGeometry, floorMaterial );
  scene.add( floor );

  
  // ^ Renderer -----------------------------------------------------
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );



}

// ^ Window Resizing Helper -----------------------------------------
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize );


// ! met Museum


// const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/3410';

// // Fetch object data
// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     // console.log(data);
//     // console.log(data.additionalImages.length !== 0);
//     console.log(data.primaryImage);
//     // const metArt = data.primaryImage;
//     // const textureLoader = new THREE.TextureLoader();
//     // const artTexture = textureLoader.load(metArt);


//     // const imageUrl = data.primaryImage;  // Get the primary image URL
//     // const textureLoader = new THREE.TextureLoader();  // Create a texture loader
//     // const texture = textureLoader.load(imageUrl);  // Load the texture from the image URL
//     // const material = new THREE.MeshBasicMaterial({ map: texture });  // Create a material using the texture
//     // const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);  // Create a mesh using the material
//     // scene.add(mesh);  // Add the mesh to the scene
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });


// ! Main Animation Controller -------------------------------------------------------------------
function animate() {
  requestAnimationFrame( animate );
  const time = performance.now();

  if ( controls.isLocked === true ) {
    raycaster.ray.origin.copy( controls.getObject().position );
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects( objects, false );

    const onObject = intersections.length > 0;

    const delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number( moveForward ) - Number( moveBackward );
    // console.log(`Moving in direction.z: ${direction.z}`)
    direction.x = Number( moveRight ) - Number( moveLeft );
    // console.log(`Moving in direction.x: ${direction.x}`)
    direction.normalize(); // this ensures consistent movements in all directions

    if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
    if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

    if ( onObject === true ) {

      velocity.y = Math.max( 0, velocity.y );
      canJump = true;

    }

    

    controls.moveRight( - velocity.x * delta );
    controls.moveForward( - velocity.z * delta );

    controls.getObject().position.y += ( velocity.y * delta ); // new behavior

    if ( controls.getObject().position.y < 10 ) {

      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;

    }

  }

  prevTime = time;

  renderer.render( scene, camera );

}