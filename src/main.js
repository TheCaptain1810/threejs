import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});

const triangleGeometry = new THREE.BufferGeometry();
const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

triangleGeometry.setAttribute("position", bufferAttribute);

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const triangle = new THREE.Mesh(triangleGeometry, cubeMaterial);

scene.add(cube);
scene.add(triangle);

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

const axes = new THREE.AxesHelper(3);
scene.add(axes);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
};

renderLoop();
