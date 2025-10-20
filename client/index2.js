import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders'; 

const canvas = document.getElementById('canvas_3d_viewer');
const engine = new BABYLON.Engine(canvas, true);

const createScene = async () => {
    const scene = new BABYLON.Scene(engine);
    //헨더링할때마다 적용되는 씬 배경색
    scene.clearColor3 = new BABYLON.Color3(0.5, 0.7, 1.0);


    //충돌시스템
    scene.collisionsEnabled = true;

    //카메라 (FllowCamera로 캐릭터 추적)
    const dummy = new BABYLON.TransformNode('dummy', scene);    //초기 타겟 (로드 전 임시)
    const camera = new BABYLON.FollowCamera('cam', new BABYLON.Vector3(0, 5, -10));
    camera.radius = 6;                  //타겟간 거리차
    camera.heightOffset = 2;            //타겟간 높이차
    camera.rotationOffset = 0           //타겟 바라보는 방향 (타겟 뒤로 설정 (TPS))
    camera.cameraAcceleration = 0.05;         //타겟을 따라가는 가속도 (부드럽게 따라감)
    camera.maxCameraSpeed = 20;
    camera.attachContorl(canvas, true);

    //조명
    new BABYLON.HemisphericLight("light",new BABYLON.Vector3(1, 1, 0), scene);

    //바닥 (충돌가능)
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { widht: 40, height: 40}, scene);
    ground.checkCollisions = true;

    // ==== GLB 캐릭터 로드 ====
    // 파일 위치에 맞게 경로/파일명 수정
    const result = await BABYLON.ImportMeshAsync("player", "/assets/", "player.glb", scene);

    const visualRoot = new BABYLON.TransformNode("visualRoot", scene);
    result.meshes.forEach(m => {
        if( m instanceof BABYLON.Mesh && m.name !== "visualRoot" ){
            m.parent = visualRoot
        }
    });
    visualRoot.scailing = new BABYLON.Vector3(1, 1, 1);
    visualRoot.position.y = -0.9;

    const collider = new BABYLON.MeshBuilder.CreateBox(
        "playerCollider",
        { width: 0.8, depth }
    )




}