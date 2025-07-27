import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import PlaneMesh from './mesh/plane';
import LineSegment from './segment/line';
import BoxMesh from './mesh/box';

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
camera.position.set(0, 500, 0);
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
    size: { width: 500, height: 500 },
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
    //중앙 큰 영역(메인 사무실)
    {
        size: {
            width: 150,
            height: 270
        },
        position: {
            x: -5,
            y: floorHeight,
            z: -35
        },
        // walls: [
        //     {
        //         size:{
        //             width: 10,
        //             height: wallHeight,
        //             depth: 270
        //         },
        //         position: {
        //             x: -75,
        //             y: wallPostionY,
        //             z: -35
        //         }
        //     }
        // ]
    },
    //우측 영역(사장실, 회의실)
    {
        size: {
            width: 40,
            height: 30
        },
        position: {
            x: -55,
            y: floorHeight,
            z: -185
        },
        walls: [
            {
                size:{
                    width: 10,
                    height: wallHeight,
                    depth: 30
                },
                position: {
                    x: -75,
                    y: wallPostionY,
                    z: -185
                }
            },
            {
                size:{
                    width: 10,
                    height: wallHeight,
                    depth: 40
                },
                position: {
                    x: -50,
                    y: wallPostionY,
                    z: -185
                },
                // rotation: true
            }
        ]
    },
    {
        size: {
            width: 35,
            height: 30
        },
        position: {
            x: -17.5,
            y: floorHeight,
            z: -185
        },
        wall: {
            
        }
    },
    {
        size: {
            width: 190,
            height: 30
        },
        position: {
            x: 95,
            y: floorHeight,
            z: -185,
        }
    },
    {
        size: {
            width: 70,
            height: 20
        },
        position: {
            x: 105,
            y: floorHeight,
            z: -160
        }
    },
    {
        size: {
            width: 70,
            height: 20
        },
        position: {
            x: 105,
            y: floorHeight,
            z: -140
        }
    },

    //좌측 영역(연구소)
    {
        size: {
            width: 150,
            height: 90
        },
        position: {
            x: -5,
            y: floorHeight,
            z: 145
        }
    },
    {
        size: {
            width: 70,
            height: 40
        },
        position: {
            x: 105,
            y: floorHeight,
            z: 120
        }
    },
    {
        size: {
            width: 70,
            height: 90
        },
        position: {
            x: 105,
            y: floorHeight,
            z: 185
        }
    },
    {
        size: {
            width: 150,
            height: 40
        },
        position: {
            x: -5,
            y: floorHeight,
            z: 210
        }
    },
    

]

rooms.forEach(room => {
    const floor = PlaneMesh.create({
        size: room["size"], 
        position: room["position"], 
        option: {
            rotationX: true,
            color: 0x888888,
            side: true
        }
    });
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