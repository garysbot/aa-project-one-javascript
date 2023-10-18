import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');

// Sizes for rendering camera aspect ratio
const sizes = {
  width: 800,
  height: 600
};

// Scene - contains objects
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xAAAAAA);

// Object - Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const cubeOne = new THREE.Mesh(geometry, material);

// Adjusting cubeOne position
cubeOne.position.x = 0.2;
cubeOne.position.y = 0.3;
cubeOne.position.z = 0.7;
// Adding cubeOne to the scene
scene.add(cubeOne);

// Cube Creator
function makeInstance(geometry, color, x){
  const material = new THREE.MeshPhongMaterial({color});
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cube.position.x = x;
  return cube;
};

const cubes = [
  makeInstance(geometry, 0x55aa88, -0.7),
  makeInstance(geometry, 0x8844aa, 0.9),
  makeInstance(geometry, 0xaa8844, 2.5)
];


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
cubeOne.position.distanceTo(camera.position);
cubeOne.position.normalize();
camera.position.x = 1;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Our first render
renderer.render(scene, camera);

// Constant render with an infinite loop
function animate(){
  requestAnimationFrame( animate );
  cubeOne.rotation.x += 0.0055;
  cubeOne.rotation.y += 0.0055;
  cubes.forEach((cube, i) => {
    if (i === 0){
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    } else if (i === 1){
      cube.rotation.x += 0.02;
      cube.rotation.y += 0.02;
    } else {
      cube.rotation.x += 0.04;
      cube.rotation.y += 0.04;
    }
  })
  renderer.render( scene, camera );
}
animate();

// Another animate approach via THREE.render and requestAnimationFrame -- Super laggy
// function render(time) {
//   time *= 0.001;

//   cubes.forEach((cube) => {
//     cube.rotation.x = time;
//     cube.rotation.y = time;
//     renderer.render(scene, camera);
//     requestAnimationFrame(render);
//   })
// }
// requestAnimationFrame(render);

// Adding a light
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// Adding additional primitive shapes
const objects = [];
const spread = 15;

function addObject(x, y, obj){
  obj.position.x = x * spread;
  obj.position.y = y * spread;

  scene.add(obj);
  objects.push(obj);
}

function createMaterial(){
  const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
  });

  const hue = Math.random();
  const saturation = 1;
  const luminance = .5;
  material.color.setHSL(hue, saturation, luminance);

  return material;

}

function addSolidGeometry(x, y, geometry) {
  const mesh = new THREE.Mesh(geometry, createMaterial());
  addObject(x, y, mesh);
}

// Adding a flat plane

const planeMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide
  })

);
planeMesh.rotateX(-Math.PI / 2);
scene.add(planeMesh);