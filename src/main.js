import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const fog = new THREE.Fog(0xffffff, 1, 10);
scene.fog = fog;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide,
});

const triangleGeometry = new THREE.BufferGeometry();
const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);

triangleGeometry.setAttribute("position", bufferAttribute);

const cube = new THREE.Mesh(cubeGeometry, material);
const triangle = new THREE.Mesh(triangleGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);

scene.add(cube);
scene.add(triangle);
scene.add(sphere);

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
