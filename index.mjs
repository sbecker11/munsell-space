import { JSDOM } from 'jsdom';
import { WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, Float32BufferAttribute, MeshBasicMaterial, Mesh } from 'three';
import { createCanvas } from 'canvas';

// Create a simulated browser environment
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
const window = dom.window;
global.document = window.document;

// Create a canvas and attach it to the global window object
const canvas = createCanvas(800, 600);
global.window = window;
global.window.HTMLCanvasElement = canvas.constructor;

// Create a WebGLRenderer with the canvas
const renderer = new WebGLRenderer({ canvas });
renderer.setSize(800, 600);

// Create a scene
const scene = new Scene();

// Create a camera
const camera = new PerspectiveCamera(75, 800 / 600, 0.1, 1000);
camera.position.z = 5;

// Create a triangle
const geometry = new BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0,  0.0,
   1.0, -1.0,  0.0,
   0.0,  1.0,  0.0,
]);
geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

const material = new MeshBasicMaterial({ color: 0x00ff00 });
const triangle = new Mesh(geometry, material);
scene.add(triangle);

// Render the scene
renderer.render(scene, camera);

console.log('Renderer created');
console.log(window.document.querySelector("p").textContent); // Prints "Hello world"
