import * as THREE from 'three';

export default class ShapeMesh {
    static create = ({
        points = [],
        position = { x:0, y:0, z:0 }, 
        option = {
            rotationX: true,
            color: 0x888888,
            side: true,
            center: false
        }
    }) => {
        const _points = points;
        const { x, y, z } = position;
        const { rotationX, color, side, center } = option;

        if(!_points || _points.length < 3) return;

        const shape = new THREE.Shape();
        shape.moveTo(_points[0]["x"], _points[0]["y"]);

        for(let i = 1 ; i < _points.length ; i++){
            shape.lineTo(_points[i]["x"], _points[i]["y"]);
        };

        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshStandardMaterial({
            color,
            side : side ? THREE.DoubleSide : THREE.FrontSide
        });
        if( center ) geometry.center();
        const mesh = new THREE.Mesh(geometry, material);
        if(rotationX) mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(x, y, z);
        
        return mesh;
    }
}