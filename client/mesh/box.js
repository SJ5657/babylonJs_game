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
            y: 0, 
            z: 0
        }, 
        option = {
            rotationX: false,
            rotationY: false,
            color: 0x888888            
        }
    }) => {
        const { width, height, depth } = size;
        const { x, y, z } = position;
        const { rotationX, rotationY ,color } = option; 
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        if(rotationX) mesh.rotation.x = -Math.PI / 2;
        if(rotationY) mesh.rotation.y = -Math.PI / 2;
        mesh.position.set(x, y, z);
        return mesh;


    } 
}