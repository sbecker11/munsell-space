import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    orbitControls.dampingFactor = 0.25;
    orbitControls.screenSpacePanning = false;
    orbitControls.maxPolarAngle = Math.PI / 2;

    // Create a plane
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Create cones
    const height = 100;
    const radius = 20;
    const coneGeometry = new THREE.ConeGeometry(radius, height, radius);
    coneGeometry.translate(0, height/2, 0);
    const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    const numCones = 200;
    for (let i = 0; i < numCones; i++) {
        const cone = new THREE.Mesh(coneGeometry, coneMaterial);
        cone.position.set(
            Math.random() * 1600 - 800,
            0,
            Math.random() * 1600 - 800
        );
        scene.add(cone);
    }

    // Set initial camera position
    camera.position.set(0, 200, 400);
    camera.lookAt(0, 0, 0);

    // Add a light to the scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

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
}

main();