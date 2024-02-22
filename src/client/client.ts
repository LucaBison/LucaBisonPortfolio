import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const scene = new THREE.Scene()
const canvas = document.getElementById('canvas') as HTMLCanvasElement

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
camera.position.set(0.7, 0.5, 0.7)

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true })
renderer.setSize(canvas?.clientWidth || 0, canvas?.clientHeight || 0)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 0.5, 0)
controls.minDistance = 0.5; // Distanza minima consentita per lo zoom
controls.maxDistance = 2;

const blackPlasticMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000, // Colore nero
    metalness: 0.0, // Nessun effetto metallico
    roughness: 0.5 // Rugosità media
});

const coloredLeatherMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000, // Colore marrone scuro (si può scegliere qualsiasi colore desiderato)
    roughness: 0.5, // Rugosità media del cuoio
    metalness: 0.1 // Bassa riflettività metallica
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

let enlargedImage = document.getElementById('enlargedImage') as HTMLDivElement
let images = document.querySelectorAll('.image') as NodeListOf<HTMLImageElement>
images.forEach(image => {
    image.addEventListener('click', function () {
        if (enlargedImage) {
            enlargedImage.innerHTML = '<img src="' + (this as HTMLImageElement).src + '">'
            enlargedImage.style.display = 'block'
            enlargedImage.addEventListener('click', function () {
                this.style.display = 'none'
            })
        }
    })
});

document.getElementById('slider')!.addEventListener('wheel', function (e) {
    e.preventDefault();
    const scrollAmount = 100; // Modifica la quantità di scorrimento secondo le tue preferenze
    this.scrollLeft += e.deltaY > 0 ? scrollAmount : -scrollAmount;
});