import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import PlaneMesh from './mesh/plane';
import ShapeMesh from './mesh/shape';
import LineSegment from './segment/line';
import BoxMesh from './mesh/box';

const type = {
    PLANE: 'plane',
    SHAPE: 'shape'
}

// 씬 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

// 카메라
const camera = new THREE.PerspectiveCamera(
    60, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);
camera.position.set(0, 600, 0);
camera.lookAt(0, 0, 0);

// 렌더러
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const viewer = document.querySelector('#viewer');
if(viewer){
    viewer.appendChild(renderer.domElement);
}else{
    document.querySelector('body').appendChild(renderer.domElement);
}


//조명
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

//바닥(plane) 생성
const base = PlaneMesh.create({
    position: { x: 0, y: 0, z: 0 },
    type: type["PLANE"],
size:{ width: 600, height: 600 },
    option: { 
        rotationX: true,
        color: 0x444444,
        side:true
    }
});

scene.add(base);

const floorHeight = 5;
const wallHeight = 70;
const wallPostionY = wallHeight / 2 + floorHeight;

const rooms = [
    

    //메인 영역(사무실)
    {
        type: type["SHAPE"],
        points:[
            {
                x: 0,
                y: 0
            },
            {
                x: 0,
                y: 280
            },
            {
                x: 45,
                y: 280
            },
            {
                x: 45,
                y: 300
            },
            {
                x: 165,
                y: 300
            },
            {
                x: 165,
                y: 265
            },
            {
                x: 150,
                y: 265
            },
            {
                x: 150,
                y: 0
            },
        ],
        position: {
            x: 0,
            y: floorHeight,
            z: 0
        }
    },
    //좌측 영역(연구소)
    {
        type: type["PLANE"],
        size:{
            width: 150,
            height: 90
        },
        position: {
            x: -7.5,
            y: floorHeight,
            z: 195
        }
    },
    //좌측 영역(서버실1)
    {
        type: type["PLANE"],
        size:{
            width: 70,
            height: 40
        },
        position: {
            x: 102.5,
            y: floorHeight,
            z: 170
        }
    },
    // //좌측 영역(회의실)
    {
        type: type["PLANE"],
        size:{
            width: 70,
            height: 90
        },
        position: {
            x: 102.5,
            y: floorHeight,
            z: 235
        }
    },
    // //좌측 영역(서버실2)
    // {
    //     type: type["PLANE"],
    //     size:{
    //         width: 150,
    //         height: 40
    //     },
    //     position: {
    //         x: -5,
    //         y: floorHeight,
    //         z: 210
    //     }
    // }
]

rooms.forEach(room => {
    let floor;
    if(room["type"] === type["PLANE"]){
        floor = PlaneMesh.create({
            size: room["size"], 
            position: room["position"], 
            option: {
                rotationX: true,
                color: 0x888888,
                side: true
            }
        });
    }else if(room["type"] === type["SHAPE"]){
        floor = ShapeMesh.create({
            points: room["points"],
            position: room["position"],
            option: {
                rotationX: true,
                color: 0x888888,
                side: true,
                center: true
            }
        })
    }
    
    const boundaryLine = LineSegment.create({
        rotationX: true,
        geometry: floor.geometry,
        position: room["position"]
    });

    scene.add(floor, boundaryLine);

    if(room['walls'] && room['walls'].length > 0){
        room['walls'].forEach(( wall ) => {
            const boxMesh = BoxMesh.create({
                size: wall["size"],
                position: wall["position"],
                option: {
                    rotationX: false,
                    rotationY: wall["rotation"] === true ? true : false,
                    color: 0xBBBBBB 
                }
            });
            scene.add(boxMesh);
        }) 
    }  
})





// OrbitControls 다음과 같은 기능을 제공한다.
// 마우스 드래그로 카메라를 중심 객체 중변으로 회전
// shift + 드래그 또는 오른쪽 클릭으로 카메라 편행 이동
// Damping 부드러운 감속 효과
const controls = new OrbitControls(camera, renderer.domElement);

//애니메이션 루프
function animate(){
    //브라우저 내장함수
    //매프레임마다, 콜백 함수 호출 
    //화면 렌더 함수를 콜백 함수로 주어, 매프레임 끝나면 자동으로 다음 프레임을 호출되게 설정 
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    //투영 행렬(시야각, 동횡비 등) 갱신시 사용하는 메소드
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});