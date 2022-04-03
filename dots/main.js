// Imports
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

init();
animate();

function init() {

  // Create camera
  camera = new OrthographicCamera(
    viewWidth / -2, viewWidth / 2,
    viewHeight / -2, viewHeight / 2,
    5, 5000
  );
  camera.position.z = 1000;

  // Create scene
  scene = new Scene();
  scene.fog = new FogExp2( 0x000000, 0.001 );
  // scene.background = new Color( 0x666666 );

  // Create geometry
  let geometry = new BufferGeometry();

  let vertices = [];

  const sprite= new TextureLoader().load(
    "https://blog.fastforwardlabs.com/images/2018/02/circle_aa-1518730700478.png"
  )

  for (let i = 0; i < 1000; i++) {
    const x = 2000 * Math.random() - 1000;
    const y = 2000 * Math.random() - 1000;
    const z = 2000 * Math.random() - 1000;

    vertices.push( x, y, z );
  }

  geometry.setAttribute( 'position', new Float32BufferAttribute( vertices, 3 ));

  material = new PointsMaterial( { 
    color: 0xAAAAAA,
    size: 8,
    sizeAttenuation: true,
    map: sprite,
    transparent: true,
    alphaTest: 0.5
  } );
  material.color.setHSL(1.0, 0.3, 0.7);

  const points = new Points( geometry, material );
  scene.add( points );

  // Create renderer
  renderer = new WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( viewWidth, viewHeight );
  document.body.appendChild(renderer.domElement);

  // Dom setup
  document.body.style.touchAction = "none";
  document.body.addEventListener( 'pointermove', onPointerMove );
  window.addEventListener( "resize", onWindowResize );

}

function animate() {
  requestAnimationFrame( animate );

  render();
}

// Render function
function render() {

  const time = Date.now() * 0.00005;

  camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  camera.position.y += ( mouseY - camera.position.y ) * 0.05;

  camera.lookAt( scene.position );
  const h = ( 360 * ( 1.0 + time) % 360) / 36;
  material.color.setHSL( h, 0.5, 0.5);

  renderer.render( scene, camera );
}

// Pointer events
function onPointerMove( event ) {
  if ( event.isPrimary === false ) return;

  mouseX = event.clientX - viewWidth / 2;
  mouseY = event.clientY - viewHeight / 2;
}

// Window resize
function onWindowResize() {
  viewWidth = window.innerWidth;
  viewHeight = window.innerHeight;

  renderer.setSize( viewWidth, viewHeight );
}



