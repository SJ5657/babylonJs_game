import * as THREE from 'three';

class LineMesh {
    constructor(points){
        const borderPoints = points.map(p => new THREE.Vectors(p.x, 0, p.y));
    }
}