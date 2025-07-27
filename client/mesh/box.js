import * as THREE from 'three';

export default class BoxMesh {
    static create = ({
        size = {
            width: 10,
            height: 10,
            depth: 10 
        }, 
        position = {
            x: 0, 
            y:0, 
            z:0
        }, 
        option = {
            horizontality: true,
            color: 0x888888            
        }
    }) => {
        const { width, height, depth } = size;
        const { x, y, z } = position;
        const { color } = option; 
        const geometry = THREE.BoxGeometry(width, height, depth);
        const material = THREE.MeshStandardMaterial({ color });
        const mesh = THREE.Mesh(geometry, material);
        if(horizontality) mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(x, y, z);
        return mesh;


    } 
}