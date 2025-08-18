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
const innerWallHeight = 50;
const innerWallthickness = 3;
const outerWallPostionY = outerWallHeight / 2 + floorHeight;
const innerWallPostionY = innerWallHeight / 2 + floorHeight;
const outerWallColor = 0x888888;
const innerWallColor = 0x888888;
const outerWallTransparent = false;
const innerWallTransparent = true;
const outerWallOpacity = 1;
const innerWallOpacity = 1;

const rooms = [
    //좌측영역
    //사장실
    {
        type: floorType["PLANE"],
        size:{
            width: 55,
            height: 70
        },
        position: {
            x: -55,
            y: floorHeight,
            z: -160
        }
    },    
    //공실1
    {
        type: floorType["PLANE"],
        size:{
            width: 30,
            height: 42
        },
        position: {
            x: -9.5,
            y: floorHeight,
            z: -174
        }
    },    
    //공실2
    {
        type: floorType["PLANE"],
        size:{
            width: 30,
            height: 42
        },
        position: {
            x: 23.5,
            y: floorHeight,
            z: -174
        }
    },    
    //회의실1
    {
        type: floorType["PLANE"],
        size:{
            width: 96,
            height: 42
        },
        position: {
            x: 89.5,
            y: floorHeight,
            z: -174
        }
    },  

    //회의실2
    {
        type: floorType["PLANE"],
        size:{
            width: 52,
            height: 32
        },
        position: {
            x: 111.5,
            y: floorHeight,
            z: -134
        }
    },    
    //회의실3
    {
        type: floorType["PLANE"],
        size:{
            width: 70,
            height: 32
        },
        position: {
            x: 102.5,
            y: floorHeight,
            z: -99
        }
    },   
    //중간 영역
    //메인 사무실
    {
        type: floorType["SHAPE"],
        points:[
            //좌측 면 시작점
            {
                x: 0,
                y: 0
            },
            {
                x: 0,
                y: 272
            },

            //상단 면 전환

            {
                x: 58,
                y: 272
            },

            //문
            {
                x: 58,
                y: 276
            },
            {
                x: 55,
                y: 276
            },
            {
                x: 55,
                y: 289
            },
            {
                x: 58,
                y: 289
            },

            {
                x: 58,
                y: 300
            },

            //문
            {
                x: 74,
                y: 300
            },
            {
                x: 74,
                y: 303
            },
            {
                x: 87,
                y: 303
            },
            {
                x: 87,
                y: 300
            },
            //문
            {
                x: 107,
                y: 300
            },
            {
                x: 107,
                y: 303
            },
            {
                x: 120,
                y: 303
            },
            {
                x: 120,
                y: 300
            },

            //문
            {
                x: 130,
                y: 300
            },
            {
                x: 130,
                y: 303
            },
            {
                x: 143,
                y: 303
            },
            {
                x: 143,
                y: 300
            },
            
            {
                x: 55,
                y: 300
            },

            //우측 면 쪽으로 반향 전환
            {
                x: 165,
                y: 300
            },

            //문
            {
                x: 165,
                y: 295
            },
            {
                x: 168,
                y: 295
            },
            {
                x: 168,
                y: 282
            },
            {
                x: 165,
                y: 282
            },

            {
                x: 165,
                y: 268
            },

            //문
            {
                x: 164,
                y: 268
            },
            {
                x: 164,
                y: 265
            },
            {
                x: 151,
                y: 265
            },
            {
                x: 151,
                y: 268
            },

            {
                x: 150,
                y: 268
            },
            {
                x: 147,
                y: 268
            },

            {
                x: 147,
                y: 0
            },
            //문
            {
                x: 146,
                y: 0
            },
            {
                x: 146,
                y: -2
            },
            {
                x: 132,
                y: -2
            },
            {
                x: 132,
                y: 0
            },
        ],
        position: {
            x: 1.5,
            y: floorHeight,
            z: -0.5
        }
    },
    //좌측 영역(연구소)
    {
        type: floorType["SHAPE"],
        points:[
            {
                x: 0,
                y: 0
            },
            {
                x: 0,
                y: 90
            },
            {
                x: 147,
                y: 90
            },

            //문
            {
                x: 147,
                y: 89
            },
            {
                x: 150,
                y: 89
            },
            {
                x: 150,
                y: 75
            },
            {
                x: 147,
                y: 75
            },

            {
                x: 147,
                y: 0
            },

            //문
            {
                x: 146,
                y: 0
            },
            {
                x: 146,
                y: -3
            },
            {
                x: 132,
                y: -3
            },
            {
                x: 132,
                y: 0
            },

            //문
            {
                x: 117,
                y: 0
            },
            {
                x: 117,
                y: -3
            },
            {
                x: 103,
                y: -3
            },
            {
                x: 103,
                y: 0
            },


        ],
        position: {
            x: -7.5,
            y: floorHeight,
            z: 198.5
        }
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
            z: 172
        }
    },
    // //좌측 영역(회의실)
    {
        type: floorType["SHAPE"],
        size:{
            width: 70,
            height: 90
        },
        points: [
            {
                x: 0,
                y: 0
            },
            {
                x: 0,
                y: 40
            },
            {
                x: 25,
                y: 40
            },
            {
                x: 25,
                y: 90
            },
            {
                x: 95,
                y: 90
            },
            {
                x: 95,
                y: 0
            }
        ],
        position: {
            x: 90,
            y: floorHeight,
            z: 240
        }
    },
    //좌측 영역(서버실2)
    {
        type: floorType["PLANE"],
        size:{
            width: 122,
            height: 40
        },
        position: {
            x: -21.5,
            y: floorHeight,
            z: 265
        }
    }
]


const outerWalls = [
    {
        size: {
            width: outerWallthickness,
            height: outerWallHeight,
            depth: 58
        },
        position: {
            x: 67, 
            y: outerWallPostionY, 
            z: -54
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: outerWallColor,
            transparent: outerWallTransparent,
            opacity: outerWallOpacity      
        }
    },
    {
        size: {
            width: outerWallthickness,
            height: outerWallHeight,
            depth: 120
        },
        position: {
            x: 67, 
            y: outerWallPostionY, 
            z: 90
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: outerWallColor,
            transparent: outerWallTransparent,
            opacity: outerWallOpacity      
        }
    },
    {
        size: {
            width: outerWallthickness,
            height: outerWallHeight,
            depth: 68
        },
        position: {
            x: 103.5, 
            y: outerWallPostionY, 
            z: 149.5
        },
        option: {
            rotationX: false,
            rotationY: true,
            color: outerWallColor,
            transparent: outerWallTransparent,
            opacity: outerWallOpacity      
        }
    },

]
const interiorWalls = [
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 55
        },
        position: {
            x: -55, 
            y: innerWallPostionY, 
            z: -123.5
        },
        option: {
            rotationX: false,
            rotationY: true,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity,
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 4
        },
        position: {
            x: -26, 
            y: innerWallPostionY, 
            z: -124
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 56
        },
        position: {
            x: -26, 
            y: innerWallPostionY, 
            z: -167
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 16
        },
        position: {
            x: -16.5, 
            y: innerWallPostionY, 
            z: -151.5
        },
        option: {
            rotationX: false,
            rotationY: true,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 42
        },
        position: {
            x: 7, 
            y: innerWallPostionY, 
            z: -174
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 20
        },
        position: {
            x: 14.5, 
            y: innerWallPostionY, 
            z: -151.5
        },
        option: {
            rotationX: false,
            rotationY: true,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 42
        },
        position: {
            x: 40, 
            y: innerWallPostionY, 
            z: -174 
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 10
        },
        position: {
            x: 42.5, 
            y: innerWallPostionY, 
            z: -151.5
        },
        option: {
            rotationX: false,
            rotationY: true,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 10
        },
        position: {
            x: 42.5, 
            y: innerWallPostionY, 
            z: -151.5
        },
        option: {
            rotationX: false,
            rotationY: true,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 77
        },
        position: {
            x: 99, 
            y: innerWallPostionY, 
            z: -151.5
        },
        option: {
            rotationX: false,
            rotationY: true,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 5
        },
        position: {
            x: 84, 
            y: innerWallPostionY, 
            z: -147.5
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 16
        },
        position: {
            x: 84, 
            y: innerWallPostionY, 
            z: -126
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 56
        },
        position: {
            x: 109.5, 
            y: innerWallPostionY, 
            z: -116.5
        },
        option: {
            rotationX: false,
            rotationY: true,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 4
        },
        position: {
            x: 66.5, 
            y: innerWallPostionY, 
            z: -116.5
        },
        option: {
            rotationX: false,
            rotationY: true,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: innerWallthickness,
            height: innerWallHeight,
            depth: 32
        },
        position: {
            x: 66, 
            y: innerWallPostionY, 
            z: -99
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },
    {
        size: {
            width: 2,
            height: innerWallHeight,
            depth: 6
        },
        position: {
            x: 66.5, 
            y: innerWallPostionY, 
            z: 151
        },
        option: {
            rotationX: false,
            rotationY: true,
            color: innerWallColor,
            transparent: innerWallTransparent,
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
            x: 66, 
            y: innerWallPostionY, 
            z: 152.5
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: innerWallColor,
            transparent: innerWallTransparent,
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
            x: 66, 
            y: innerWallPostionY, 
            z: 152.5
        },
        option: {
            rotationX: false,
            rotationY: false,
            color: innerWallColor,
            transparent: innerWallTransparent,
            opacity: innerWallOpacity      
        }
    },

  
    
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
})

interiorWalls.forEach(( wall ) => {
    const mesh = BoxMesh.create(wall);
    scene.add(mesh);
})
outerWalls.forEach(( wall ) => {
    const mesh = BoxMesh.create(wall);
    scene.add(mesh);
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