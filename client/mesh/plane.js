import * as THREE from 'three';

export default class PlaneMesh {
    static create = ({
        position = { x: 0, y: 0, z: 0 }, 
        size={ width: 5, height: 5 }, 
        option = {rotationX: true, color: 0x444444, side: true}
    }) => {
        const { x, y, z } = position;
        const { width, height } = size;
        const { rotationX, color, side } = option;
        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshStandardMaterial({
            color,
            side
        });
        const mesh = new THREE.Mesh(geometry, material);
        if(rotationX) mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(x, y, z);
        return mesh;
    };
}