// cones.js

// requires npm install three
import { PlaneGeometry, ConeGeometry, MeshBasicMaterial, MeshPhongMaterial, Mesh } from 'three';
import { CylinderGeometry, Group, DoubleSide, Color } from 'three';

export function createCones() {
    // Create a plane
    const cones = [];
    const planeGeometry = new PlaneGeometry(2000, 2000);
    const planeMaterial = new MeshBasicMaterial({ color: 0x999999, side: DoubleSide });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    cones.push(plane);
    
    // Create cones
    const height = 100;
    const radius = 20;
    const coneGeometry = new ConeGeometry(radius, height, radius);
    coneGeometry.translate(0, height/2, 0);
    const coneMaterial = new MeshBasicMaterial({ color: 0xff0000 });

    const numCones = 200;
    for (let i = 0; i < numCones; i++) {
        const cone = new Mesh(coneGeometry, coneMaterial);
        cone.position.set(
            Math.random() * 1600 - 800,
            0,
            Math.random() * 1600 - 800
        );
        cones.push(cone);
    }
    return cones;
}