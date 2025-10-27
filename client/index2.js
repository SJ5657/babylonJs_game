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
    //크기/원점 보정(원본 유지)
    visualRoot.scailing = new BABYLON.Vector3(1, 1, 1);
    //발이 지면 바로 위에 오도록, 캐릭터 y위치 변경
    visualRoot.position.y = -0.9;

    //캐릭터 충돌영역 생성
    const collider = new BABYLON.MeshBuilder.CreateBox(
        "playerCollider",
        { width: 0.8, depth: 0.8, height: 1.8 }
    );
    collider.isVisible = false;
    collider.position = new BABYLON.Vector3(0, 0.9, 0);
    collider.checkCollisions = true;
    //실질적인 충돌영역설정(타원체 크기)
    collider.ellipsoid = new BABYLON.Vector3(0.4, 0.9, 0.4);
    collider.ellipsoidOffset = new BABYLON.Vector3(0, 0.9, 0);

    //로드된 캐릭터를 콜라이더에 붙임
    visualRoot.parent = collider;

    //카메라 타겟을 콜라이더로 변경(캐릭터 중심 추적)
    camera.lockedTarget = collider;

    const groups = result.animationGroups || [];
    const findAnim = ( namePart ) => groups.find(( g ) => g.name.toLowerCase().includes( namePart ));
    const idle = findAnim("idle");
    const walk = findAnim("walk");
    const run = findAnim("run");

    if ( idle ) idle.start( true );

    const keys = { w: false, a: false, s:false, d: false };
    const moveSpeed = 0.08;

    const setKey = ( e, down ) => {
        const k = e.key.toLowerCase();
        if( k in keys ) keys[k] = down;
    };

    window.addEventListener("keydown", ( e ) => {
        setKey( e, true );
    });

    window.addEventListener("keyup", ( e ) => {
        setKey(e, false);
    });

    scene.onBeforeRenderObservable.add(() => {
        const up = BABYLON.Axis.Y;
        const f = camera.getForwardRay().direction.clone();
        f.y = 0;
        if(!f.equals(BABYLON.Vector3.Zero())) f,normalize();
        const right = BABYLON.Vector3.Cross(up, f).normalize();

        const move = BABYLON.Vector3.Zero();
        if(keys.w) move = move.add(f);
        if(keys.s) move = move.subtract(f);
        if(keys.a) move = move.subtract(right);
        if(keys.d) move = move.add(right);

        if(!move.equals(BABYLON.Vector3.Zero())){
            move = move.normalize().scale(moveSpeed);
            collider.moveWithCollisions(move);
        }
    })


    
    




}