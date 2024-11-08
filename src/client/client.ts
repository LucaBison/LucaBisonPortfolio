import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const scene = new THREE.Scene()
const canvas = document.getElementById('canvas1') as HTMLCanvasElement

const light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(0, 1, 1)
scene.add(light)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight ,
    0.1,
    1000
)
camera.position.set(0.6, 0.5, 0.6)

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })
renderer.setSize(canvas?.clientWidth || 0, canvas?.clientHeight || 0)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 0.5, 0)
controls.minDistance = 0.5; // Distanza minima consentita per lo zoom
controls.maxDistance = 2;
controls.enablePan = false; // Disabilita lo spostamento della scena con il tasto destro del mouse

const blackPlasticMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000, 
    metalness: 0.0, 
    roughness: 0.5 
});

const coloredLeatherMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000, 
    roughness: 0.5, 
    metalness: 0.1 
});

let fbxObject: THREE.Object3D | undefined;

const fbxLoader = new FBXLoader()
fbxLoader.load(
    'models/cuffie.fbx',
    (object) => {
        fbxObject = object as THREE.Group;
        fbxObject.scale.set(.01, .01, .01);
        (fbxObject.children[0] as THREE.Mesh).material = blackPlasticMaterial;
        (fbxObject.children[1] as THREE.Mesh).material = coloredLeatherMaterial;
        fbxObject.position.set(0, 0.2, 0);
        scene.add(fbxObject);
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    if (canvas) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        render()
    }
}


function animate() {

    if (fbxObject) fbxObject.rotation.y -= 0.01
    requestAnimationFrame(animate)

    controls.update()

    render()

}

function render() {
    renderer.render(scene, camera)
}

animate()

// JS

let windowWidth = window.innerWidth
let blackScreen = document.getElementById('blackScreen') as HTMLDivElement
let enlargedImage = document.getElementById('enlargedImage') as HTMLDivElement
let images = document.querySelectorAll('.imagePc') as NodeListOf<HTMLImageElement>

if (windowWidth > 768) {
    images.forEach(image => {
        image.addEventListener('click', function () {
            if (enlargedImage) {
                enlargedImage.innerHTML = '<img src="' + (this as HTMLImageElement).src + '">'
                enlargedImage.style.display = 'block'
                blackScreen.style.display = 'block'
                enlargedImage.addEventListener('click', function () {
                    this.style.display = 'none'
                    blackScreen.style.display = 'none'
                })
            }
        })
    });
}
