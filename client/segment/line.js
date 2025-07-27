import * as THREE from 'three';

export default class LineSegment {
    static create = ({
        geometry,
        position = {x: 0, y: 0, z:0},
        option= { color: 0x000 }
    }) => {
        const { x, y, z } = position;
        const edgeGeometry = new THREE.EdgesGeometry(geometry);
        const edgeMaterial = new THREE.LineBasicMaterial({color: option['color']});  
        const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
        edges.rotation.x = -Math.PI / 2;
        edges.position.set(x, y, z);
        return edges;
    }
}