// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer and attach it to the document
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a triangle
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0,  0.0,
   1.0, -1.0,  0.0,
   0.0,  1.0,  0.0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const triangle = new THREE.Mesh(geometry, material);
scene.add(triangle);

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
