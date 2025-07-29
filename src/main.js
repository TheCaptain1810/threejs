import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";

const pane = new Pane();

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);

// const fog = new THREE.Fog(0xffffff, 1, 10);
// scene.fog = fog;

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0x00ff00);

pane
  .addBinding(material, "metalness", {
    min: 0,
    max: 1,
    step: 0.01,
  })
  .on("change", (ev) => {
    material.metalness = ev.value;
  });

pane
  .addBinding(material, "roughness", {
    min: 0,
    max: 1,
    step: 0.01,
  })
  .on("change", (ev) => {
    material.roughness = ev.value;
  });

// const params = {
//   shininess: 90,
// };

// pane
//   .addBinding(params, "shininess", {
//     min: 0,
//     max: 100,
//     step: 1,
//   })
//   .on("change", (ev) => {
//     material.shininess = ev.value;
//   });

const triangleGeometry = new THREE.BufferGeometry();
const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
const bufferAttribute = new THREE.BufferAttribute(vertices, 3);
triangleGeometry.setAttribute("position", bufferAttribute);

const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);

const cube = new THREE.Mesh(cubeGeometry, material);
const triangle = new THREE.Mesh(triangleGeometry, material);
const sphere = new THREE.Mesh(sphereGeometry, material);
const torusKnot = new THREE.Mesh(torusKnotGeometry, material);

// scene.add(cube);
// scene.add(triangle);
// scene.add(sphere);
scene.add(torusKnot);

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const axes = new THREE.AxesHelper(3);
scene.add(axes);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

const controls = new OrbitControls(camera, renderer.domElement);

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
