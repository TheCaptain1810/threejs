import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";

const pane = new Pane();

// Scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xffffff);

// const fog = new THREE.Fog(0xffffff, 1, 10);
// scene.fog = fog;

// Materials
const material = new THREE.MeshPhysicalMaterial();
material.color = new THREE.Color(0x00ff00);

// Panes
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

pane
  .addBinding(material, "reflectivity", {
    min: 0,
    max: 1,
    step: 0.01,
  })
  .on("change", (ev) => {
    material.reflectivity = ev.value;
  });

pane
  .addBinding(material, "clearcoat", {
    min: 0,
    max: 1,
    step: 0.01,
  })
  .on("change", (ev) => {
    material.clearcoat = ev.value;
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

// Geometries
// const triangleGeometry = new THREE.BufferGeometry();
// const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
// const bufferAttribute = new THREE.BufferAttribute(vertices, 3);
// triangleGeometry.setAttribute("position", bufferAttribute);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

// Groups
const group = new THREE.Group();

// Meshes
// const triangle = new THREE.Mesh(triangleGeometry, material);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;

const cube = new THREE.Mesh(cubeGeometry, material);

const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = 1.5;

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.y = 1.5;

const cylinder = new THREE.Mesh(cylinderGeometry, material);
cylinder.position.y = -1.5;

// scene.add(triangle);
group.add(plane, cube, sphere, torusKnot, cylinder);
scene.add(group);

// Renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Axes
const axes = new THREE.AxesHelper(3);
scene.add(axes);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const renderLoop = () => {
  group.children.forEach((child) => {
    child.rotation.y += 0.01;
  });
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
};

renderLoop();
