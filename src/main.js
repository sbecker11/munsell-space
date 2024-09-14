import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createRolodex } from './models/rolodex.js';
import { createCones } from './models/cones.js';
import { BACKGROUND_COLOR } from './config.js';

// export { THREE }; // Export THREE to be used in other modules

function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Set the background color of the scene
    scene.background = new THREE.Color(0x282c34); // Match the background color of the in body of index.html

    // Create OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    orbitControls.dampingFactor = 0.25;
    orbitControls.screenSpacePanning = false;
    orbitControls.minPolarAngle = 0;
    orbitControls.maxPolarAngle = Math.PI;

    // create a cylinder and some blocks
    const [rolodex, boundingBox] = createRolodex();
    scene.add(rolodex);

    // create a plane and some cones
    // const cones = createCones();
    // for ( let cone of cones ) {
    //     scene.add(cone);
    // }

    // Set initial camera position
    camera.position.set(0, 2, 0);
    camera.lookAt(0, 0, 0);

    // Add a light to the scene
    const dir1Color = 0xffffff;
    const dir1Intensity = 4;
    const dir1Light = new THREE.DirectionalLight(dir1Color, dir1Intensity);
    dir1Light.position.set(1, 1, 1).normalize();
    scene.add(dir1Light);
    scene.add(dir1Light.target); // set target to the origin

    // Add a light2 to the scene
    const dir2Color = 0xffffff;
    const dir2Intensity = 1;
    const dir2Light = new THREE.DirectionalLight(dir2Color, dir2Intensity);
    dir2Light.position.set(-1, -1, -1).normalize();
    scene.add(dir2Light);
    scene.add(dir2Light.target); // set target to the origin

    // Add an ambient light to the scene
    const ambientColor = 0xffffff; 
    const ambientIntensity = 0.2; 
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambientLight);

    function animate() {
        requestAnimationFrame(animate);

        // Update OrbitControls
        orbitControls.update();

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Clear the HTML content of the div with id="info"
    document.getElementById('info').innerHTML = 'Triangle Project';
}

main();