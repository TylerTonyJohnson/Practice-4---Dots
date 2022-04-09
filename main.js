// Imports
import * as THREE from 'three';
import * as d3 from 'd3';

let camera, scene, renderer, material;
let view, zoom;
let mouseX = 0, mouseY = 0;

let viewWidth = window.innerWidth;
let viewHeight = window.innerHeight;

const sprite= new THREE.TextureLoader().load(
  "https://blog.fastforwardlabs.com/images/2018/02/circle_aa-1518730700478.png"
)

init();
addDot( 0, 0 );
animate();

function init() {

  // Create camera
  camera = new THREE.OrthographicCamera(
    viewWidth / -2, viewWidth / 2,
    viewHeight / -2, viewHeight / 2,
    5, 5000
  );
  camera.position.z = 1000;

  // Create scene
  createScene();

  // Load material
  material = new THREE.PointsMaterial( { 
    color: 0xAAAAAA,
    size: 60,
    sizeAttenuation: false,
    map: sprite,
    transparent: true,
    alphaTest: 0.5
  } );
  material.color.setHSL(1.0, 0.3, 0.7);

  // Create renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( viewWidth, viewHeight );
  document.body.appendChild(renderer.domElement);

  // Dom setup
  document.body.style.touchAction = "none";
  document.body.addEventListener( 'pointermove', onPointerMove );
  document.body.addEventListener( 'click', onClick );
  document.body.addEventListener( 'contextmenu', event => event.preventDefault() )
  document.body.addEventListener( 'contextmenu', clearScene );
  window.addEventListener( "resize", onWindowResize );

}

function animate() {
  requestAnimationFrame( animate );

  render();
}

// Render function
function render() {

  const time = Date.now() * 0.00005;

  // camera.position.x += ( 2 * mouseX - camera.position.x ) * 0.05;
  // camera.position.y += ( 2 * mouseY - camera.position.y ) * 0.05;

  // camera.lookAt( scene.position );
  // const h = ( 360 * ( 1.0 + time) % 360) / 36;
  // material.color.setHSL( h, 0.5, 0.5);

  scene.children.forEach(dot => {
    const [lastX, lastY] = [dot.position.x, dot.position.y];
    dot.position.x += 1 * (Math.random() - 0.5);
    dot.position.y += 1 * (Math.random() - 0.5);

    // material.size = 60 + 10 * (dot.position.x - lastX);

  })

  renderer.render( scene, camera );
}

// Pointer events
function onPointerMove( event ) {
  if ( event.isPrimary === false ) return;

  mouseX = event.clientX - viewWidth / 2;
  mouseY = event.clientY - viewHeight / 2;
}

function onClick ( event ) {
  const x = event.clientX - viewWidth / 2;
  const y = event.clientY - viewHeight / 2;
  addDot(x, y);
}

// Window resize
function onWindowResize() {
  viewWidth = window.innerWidth;
  viewHeight = window.innerHeight;

  renderer.setSize( viewWidth, viewHeight );
}

// Dot management
function addDot(x, y) {

  // Create geometry
  let geometry = new THREE.BufferGeometry();

  let vertices = [];

  vertices[0] = x;
  vertices[1] = y;
  vertices[2] = 0;

  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ));

  const points = new THREE.Points( geometry, material );
  scene.add( points );

}

// Scene management
function createScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x223344 );
}

function clearScene() {
  createScene();
}
