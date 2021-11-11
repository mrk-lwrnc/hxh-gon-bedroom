import { Engine, Scene, Color3, Color4, HemisphericLight, Vector3, ArcRotateCamera, MeshBuilder, Tools, SceneLoader } from "babylonjs";
import "babylonjs-loaders"

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

function createScene() {
    let scene = new Scene(engine);
    scene.clearColor = Color4.FromHexString("#222222FF");

    createLight(scene);
    createCamera(scene);
    createGonBedroom(scene);

    return scene;
}

function createLight(scene) {
    const light_position = new Vector3(0, 40, 0);

    let light = new HemisphericLight("light", light_position, scene);
    light.intensity = 1;
    light.diffuse = new Color3(1, 1, 0);

    const light_origin = MeshBuilder.CreateSphere("sphere", { diameter: 0.3 }, scene);
    light_origin.position = light_position;
}

function createCamera(scene) {
    let camera = new ArcRotateCamera("cam", Tools.ToRadians(45), Tools.ToRadians(45), 50, new Vector3(0, 35, 0), scene);
    camera.lowerRadiusLimit = 0;
    camera.upperRadiusLimit = 5;
    camera.attachControl(canvas, true);
}

function createGonBedroom(scene) {
    const gonBedroomImport = SceneLoader.ImportMesh('', './assets/', 'gon-bedroom.glb', scene);
}


let scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});