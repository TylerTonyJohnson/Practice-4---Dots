// Imports
import { BufferAttribute } from 'three';
import { 
  BufferGeometry, 
  Color, 
  Float32BufferAttribute, 
  FogExp2, 
  MathUtils, 
  OrthographicCamera, 
  PerspectiveCamera, 
  Points, 
  PointsMaterial, 
  Scene,
  TextureLoader,
  Vector3, 
  VertexColors, 
  WebGLRenderer 
} from 'three';

let camera, scene, renderer, material;
let mouseX = 0, mouseY = 0;

let viewWidth = window.innerWidth;
let viewHeight = window.innerHeight;

const sprite= new TextureLoader().load(
  "https://blog.fastforwardlabs.com/images/2018/02/circle_aa-1518730700478.png"
)

init();
addDot( 0, 0 );
animate();

function init() {

  // Create camera
  camera = new OrthographicCamera(
    viewWidth / -2, viewWidth / 2,
    viewHeight / -2, viewHeight / 2,
    5, 5000
  );
  camera.position.z = 1000;

  createScene()

  // Load material
  material = new PointsMaterial( { 
    color: 0xAAAAAA,
    size: 20,
    sizeAttenuation: false,
    map: sprite,
    transparent: true,
    alphaTest: 0.5
  } );
  material.color.setHSL(1.0, 0.3, 0.7);

  // Create renderer
  renderer = new WebGLRenderer();
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
  let geometry = new BufferGeometry();

  let vertices = [];

  vertices[0] = x;
  vertices[1] = y;
  vertices[2] = 0;

  geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ));

  const points = new Points( geometry, material );
  scene.add( points );

}

function createScene() {
    scene = new Scene();
    scene.background = new Color( 0x223344 );
}

function clearScene() {
  createScene();
}
