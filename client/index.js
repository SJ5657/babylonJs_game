import * as Babylon from 'babylonjs';

const canvas = document.getElementById('canvase_viewer');

//엔진 생성 (두번째 인자값: 안티앨리어싱 허용);
const engine = new Babylon.Engine(canvas, true);

const createScene = () => {
    //씬 생성
    const scene = new Babylon.Scene(engine);
    scene.clearColor = new Babylon.Color3(0.5, 0.7, 1.0);
    

    //카메라 생성
    const camera = new Babylon.ArcRotateCamera(
        "camera",                   //카메라 이름
        Math.PI / 2,                //alpha: 타켓을 기준으로, 좌우회전값 (카메라 좌우 위치)
        Math.PI / 3,                //beta: 타겟을 기준으로, 수직회전값 (카메라 수직 위치)
        10,                         //radius: 카메라와 타겟간 거리
        Babylon.Vector3.Zero(),     //TAGER:카메라가 바라볼 대상의 좌표
        scene                       //scene: scene 객체
    );
    //카메라 조작 허용(마우스 / 키보드로)
    camera.attachControl(
        canvas, 
        true                        //브라우저 기본 동작 허용(마우스 드래그 중 텍스트 선택 / 스크롤 허용)
    );


    //조명 생성
    // HemisphericLight: 장면 전체에 부드럽고 균일한 빛을 주는 기본 조명 (하늘빛 느낌)
    // 첫 번째 인자는 조명 이름, 두 번째 인자는 빛이 오는 방향 벡터
    const light = new Babylon.HemisphericLight(
        'light',                        // 조명 이름
        new Babylon.Vector2(1, 1, 0),   // 빛이 오는 방향 백터
        scene                           // 추가되는 scene객체
    );


    //플레이어 생성
    const player = Babylon.MeshBuilder.CreateBox(
        'Player', 
        { size: 1 }, 
        scene
    );
    player.position.y = 0.5;


    // 바닥 생성 
    const ground = Babylon.MeshBuilder.CreateGround(
        "ground",
        { 
            width: 20,
            height: 20
        },
        scene
    );

    //이동변수
    const moveSpeed = 0.1;
    const keys = {
        w: false,
        a: false,
        s: false,
        d: false
    };

    window.addEventListener('keydown', ( e ) => {
        const key = e.key.toLowerCase();
        if( keys.hasOwnProperty(key) ) {
            keys[key] = true;
        };
    });

    window.addEventListener('keyup', ( e ) => {
        const key = e.key.toLowerCase();
        if(keys.hasOwnProperty(key)) {
            keys[key] = false;
        }
    });

    //프레임 갱신 전에 실행되는 콜백함수 등록
    scene.onBeforeRenderObservable.add(() => {
        //getForwardRay: 카메라가 바라보는 방향 벡터값(Babylon.Ray 객체) 반환
        const forward = camera.getForwardRay().direction;
        const right = Babylon.Vector3.Cross(forward, Babylon/Axis)
    })
}