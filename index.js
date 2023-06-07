import {
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer,
    Vector2,
    MOUSE,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils,
    Clock,
    MeshLambertMaterial,
    DirectionalLight,
    MeshToonMaterial,
    Color,
    MeshPhongMaterial,
    TextureLoader,
    LoadingManager,
    AmbientLight,
    SpotLight,
    HemisphereLight,
    SphereGeometry,
    AxesHelper,
    GridHelper
} from 'three';

//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import CameraControls from 'camera-controls';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'


const subsetOfTHREE = {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere,
    Raycaster,
    MathUtils: {
      DEG2RAD: MathUtils.DEG2RAD,
      clamp: MathUtils.clamp
    }
  };


// 1 scene
const scene = new Scene();
const canvas = document.getElementById('three-canvas');
const loader = new TextureLoader();

const gltfloader = new GLTFLoader();



const grid = new GridHelper(6, 6);
grid.material.depthTest = false;
grid.renderOrder = 0;
scene.add(grid);

// 2 The object



//const blueMaterial = new MeshLambertMaterial({color: new Color(0.04, 0.43, 0.6)});



    gltfloader.load('./medieval_house_and_wine_shop.glb',
    (gltf) => {
        scene.add(gltf.scene.rotateY(5).translateY(-150).translateX(250).translateZ(-20));
    }, 
    (progress) => {
        console.log(progress);
    },
    (error) => {
        console.log(error);
    })


    
// 3 The camera

const sizes = {
    width: 800,
    height: 600
}

const camera = new PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight);
camera.position.z = 1000;
camera.position.x = -800;
camera.position.y = 100;
scene.add(camera);

// 4 The Renderer
const renderer = new WebGLRenderer({canvas: canvas});
const pixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(pixelRatio);
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false); //false =  (do not ) update the style of element
renderer.setClearColor(0xc2c2c2, 1);

// 5 Lights

const light1 = new DirectionalLight(0xeb9824, 0.9);
light1.position.set(400, 300, 300).normalize();
scene.add(light1);

const light2 = new DirectionalLight(0xeb9824, 0.9);
light2.position.set(100, 800, 300).normalize();
scene.add(light2);


const ambientLight = new AmbientLight( 0x7e5858, 0.8);
scene.add(ambientLight);


const skyColor= 'white';
const groundColor= 0xb97a20;
const intensity = 1;
const light = new HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

const color = 0xFFFFFF;
const spotLight = new SpotLight(color, intensity, 3, 10 );
scene.add(spotLight);
//scene.add(spotLight.target)



// 6 Responsitivity 
window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
})


// 7 Controls

//const controls = new OrbitControls(camera, canvas);
//controls.enableDamping = true;



CameraControls.install({THREE: subsetOfTHREE});
const clock = new Clock;
const cameraControls = new CameraControls(camera, canvas);
cameraControls.dollyToCursor = true;


// 8 Animation

function animate() {
    //orangeCube.rotation.x += 0.01;
    //orangeCube.rotation.z += 0.01;

    //bigBlueCube.rotation.x -= 0.02;
    //bigBlueCube.rotation.z -= 0.02;

    //controls.update();

    const delta = clock.getDelta();
    cameraControls.update(delta);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// 10 Debugging

const gui = new GUI();

//transformationFolder.add(earth.position, 'x', min, max, step).name('Position X');
//transformationFolder.add(earth.position, 'y', min, max, step).name('Position Y');
//transformationFolder.add(earth.position, 'z', min, max, step).name('Position Z');

//transformationFolder.close();

//visabilityFolder.add(moon, 'visible').name('Moon visibility');

//visabilityFolder.close();
const skyColorParam = {
    value: 0xffffff,
}

gui.addColor(skyColorParam, 'value').name('Sky Color').onChange(() => {
    light.color.set(skyColorParam.value);
});

const lightColorParam = {
    value: 0xeb9824,
}

gui.addColor(lightColorParam, 'value').name('Sunset Color').onChange(() => {
    light1.color.set(lightColorParam.value);
});

const light2ColorParam = {
    value: 0xeb9824,
}

gui.addColor(light2ColorParam, 'value').name('Sunset 2 Color').onChange(() => {
    light2.color.set(light2ColorParam.value);
});



const ambientColorParam = {
    value: 0x7e5858,
}

gui.addColor(ambientColorParam, 'value').name('Ambient Color').onChange(() => {
    ambientLight.color.set(ambientColorParam.value);
});


