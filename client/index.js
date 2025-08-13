import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import PlaneMesh from './mesh/plane';
import ShapeMesh from './mesh/shape';
import LineSegment from './segment/line';
import BoxMesh from './mesh/box';

const floorType = {
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
    type: floorType["PLANE"],
size:{ width: 600, height: 600 },
    option: { 
        rotationX: true,
        color: 0x444444,
        side:false
    }
});

scene.add(base);

const floorHeight = 5;
const outerWallHeight = 50;
const outerWallthickness = 5;
const innerWallHeight = 40;
const innerWallthickness = 3;
const outerWallPostionY = outerWallHeight / 2 + floorHeight;
const innerWallPostionY = innerWallHeight / 2 + floorHeight;
const innerWallOpacity = 0.5;

const rooms = [
    //좌측영역
    //사장실
    {
        type: floorType["PLANE"],
        size:{
            width: 55,
            height: 60
        },
        position: {
            x: -55,
            y: floorHeight,
            z: -155
        },
        outerWalls: [
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 60
                },
                position: {
                    x: -80,
                    y: outerWallPostionY,
                    z: -155
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            },
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 50
                },
                position: {
                    x: -52.5,
                    y: outerWallPostionY,
                    z: -182.5
                },
                option: {
                    rotation: true,
                    color: 0x888888
                }
            },
        ],
        innerWalls: [
            {
                size: {
                    width: innerWallthickness,
                    height: innerWallHeight,
                    depth: 53
                },
                position: {
                    x: -51,
                    y: innerWallPostionY,
                    z: -123.5
                },
                option: {
                    rotation: true,
                    color: 0x888888,
                    transparent: true,
                    opacity: innerWallOpacity
                }
            },
            {
                size: {
                    width: innerWallthickness,
                    height: innerWallHeight,
                    depth: 1
                },
                position: {
                    x: -26,
                    y: innerWallPostionY,
                    z: -125.5
                },
                option: {
                    rotation: false,
                    color: 0x888888,
                    transparent: true,
                    opacity: innerWallOpacity
                }
            },
            {
                size: {
                    width: innerWallthickness,
                    height: innerWallHeight,
                    depth: 40
                },
                position: {
                    x: -26,
                    y: innerWallPostionY,
                    z: -160
                },
                option: {
                    rotation: false,
                    color: 0x888888,
                    transparent: true,
                    opacity: innerWallOpacity
                }
            },
        ]
    },    
    //공실1
    {
        type: floorType["PLANE"],
        size:{
            width: 30,
            height: 35
        },
        position: {
            x: -8.5,
            y: floorHeight,
            z: -167.5
        },
        outerWalls:[
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 35
                },
                position: {
                    x: -12.5,
                    y: outerWallPostionY,
                    z: -182.5
                },
                option: {
                    rotation: true,
                    color: 0x888888
                }
            },
        ]
    },    
    //공실2
    {
        type: floorType["PLANE"],
        size:{
            width: 30,
            height: 35
        },
        position: {
            x: 13.5,
            y: floorHeight,
            z: -167.5
        },
        outerWalls:[
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 35
                },
                position: {
                    x: 17.5,
                    y: outerWallPostionY,
                    z: -182.5
                },
                option: {
                    rotation: true,
                    color: 0x888888
                }
            },
        ]
    },    
    //회의실1
    {
        type: floorType["PLANE"],
        size:{
            width: 101,
            height: 35
        },
        position: {
            x: 83,
            y: floorHeight,
            z: -167.5
        },
        outerWalls:[
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 105
                },
                position: {
                    x: 85,
                    y: outerWallPostionY,
                    z: -182.5
                },
                option: {
                    rotation: true,
                    color: 0x888888
                }
            },
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 30
                },
                position: {
                    x: 135,
                    y: outerWallPostionY,
                    z: -165
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            },
        ]
    },  

    //회의실2
    {
        type: floorType["PLANE"],
        size:{
            width: 55,
            height: 35
        },
        position: {
            x: 110,
            y: floorHeight,
            z: -132.5
        },
        outerWalls:[
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 35
                },
                position: {
                    x: 135,
                    y: outerWallPostionY,
                    z: -132.5
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            },
        ]
    },    
    //회의실3
    {
        type: floorType["PLANE"],
        size:{
            width: 70,
            height: 35
        },
        position: {
            x: 102.5,
            y: floorHeight,
            z: -97.5
        },
        outerWalls:[
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 35
                },
                position: {
                    x: 135,
                    y: outerWallPostionY,
                    z: -97.5
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            },
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 65
                },
                position: {
                    x: 100,
                    y: outerWallPostionY,
                    z: -82.5
                },
                option: {
                    rotation: true,
                    color: 0x888888
                }
            },
        ]
    },   
    //중간 영역
    //메인 사무실
    {
        type: floorType["SHAPE"],
        points:[
            {
                x: 0,
                y: 0
            },
            {
                x: 0,
                y: 275
            },
            {
                x: 55,
                y: 275
            },

            {
                x: 55,
                y: 290
            },
            {
                x: 58,
                y: 290
            },
            {
                x: 58,
                y: 300
            },

            {
                x: 55,
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
        },
        outerWalls:[
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 70
                },
                position: {
                    x: 65,
                    y: outerWallPostionY,
                    z: -50
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            },
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 110
                },
                position: {
                    x: 65,
                    y: outerWallPostionY,
                    z: 95
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            },

            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 275
                },
                position: {
                    x: -80,
                    y: outerWallPostionY,
                    z: 12.5
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            },
        ]
    },
    //좌측 영역(연구소)
    {
        type: floorType["PLANE"],
        size:{
            width: 150,
            height: 90
        },
        position: {
            x: -7.5,
            y: floorHeight,
            z: 195
        },
        outerWalls: [
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 90
                },
                position: {
                    x: -80,
                    y: outerWallPostionY,
                    z: 195
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            }
        ]
    },
    //좌측 영역(서버실1)
    {
        type: floorType["PLANE"],
        size:{
            width: 70,
            height: 40
        },
        position: {
            x: 102.5,
            y: floorHeight,
            z: 170
        },
        outerWalls:[
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 75
                },
                position: {
                    x: 100,
                    y: outerWallPostionY,
                    z: 152.5
                },
                option: {
                    rotation: true,
                    color: 0x888888
                }
            },
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 40
                },
                position: {
                    x: 135,
                    y: outerWallPostionY,
                    z: 170
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            },
        ]
    },
    // //좌측 영역(회의실)
    {
        type: floorType["PLANE"],
        size:{
            width: 70,
            height: 90
        },
        position: {
            x: 102.5,
            y: floorHeight,
            z: 235
        },
        outerWalls: [
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 90
                },
                position: {
                    x: 135,
                    y: outerWallPostionY,
                    z: 235
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            },
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 70
                },
                position: {
                    x: 100,
                    y: outerWallPostionY,
                    z: 277.5
                },
                option: {
                    rotation: true,
                    color: 0x888888
                }
            },
        ]
    },
    //좌측 영역(서버실2)
    {
        type: floorType["PLANE"],
        size:{
            width: 150,
            height: 40
        },
        position: {
            x: -7.5,
            y: floorHeight,
            z: 260
        },
        outerWalls: [
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 145
                },
                position: {
                    x: -7.5,
                    y: outerWallPostionY,
                    z: 277.5
                },
                option: {
                    rotation: true,
                    color: 0x888888
                }
            },
            {
                size: {
                    width: outerWallthickness,
                    height: outerWallHeight,
                    depth: 40
                },
                position: {
                    x: -80,
                    y: outerWallPostionY,
                    z: 260
                },
                option: {
                    rotation: false,
                    color: 0x888888
                }
            },
        ]
    }
]

rooms.forEach(room => {
    let floor;
    if(room["type"] === floorType["PLANE"]){
        floor = PlaneMesh.create({
            size: room["size"], 
            position: room["position"], 
            option: {
                rotationX: true,
                color: 0x888888,
                side: true
            }
        });
    }else if(room["type"] === floorType["SHAPE"]){
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

    if(room['outerWalls'] && room['outerWalls'].length > 0){
        room['outerWalls'].forEach(( wall ) => {
            const boxMesh = BoxMesh.create({
                size: wall["size"],
                position: wall["position"],
                option: {
                    rotationX: false,
                    rotationY: wall["option"]["rotation"] === true ? true : false,
                    color: 0xBBBBBB 
                }
            });
            scene.add(boxMesh);
        }) 
    } 
    if(room['innerWalls'] && room['innerWalls'].length > 0){
        room['innerWalls'].forEach(( wall ) => {
            const boxMesh = BoxMesh.create({
                size: wall["size"],
                position: wall["position"],
                option: {
                    rotationX: false,
                    rotationY: wall["option"]["rotation"] === true ? true : false,
                    color: 0xBBBBBB,
                    transparent: wall["option"]["transparent"],
                    opacity: wall["option"]["opacity"]
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