import * as THREE from 'three';

class LineMesh {
    
    constructor(points, option = {color: '#000', borderWidth: 1}){
        const { color,  borderWidth} = option;
        borderPoints.push(borderPoints[0]);
        const borderMaterial = new THREE.LineBasicMaterial({
            color,
            linewidth: borderWidth
        })

        line = new THREE.LineLoop(borderGeometry, borderMaterial);
    }
}