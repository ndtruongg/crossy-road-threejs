import * as THREE from 'three';
import { Camera } from './components/Camera'
import { player } from './components/Player';
import { map, initMap } from './components/Map';
import { Renderer } from './components/Renderer';
import { DirectionalLight } from './components/DirectionLight';
import { animateVehicles } from './animateVehicles';
import { animatePlayer } from './animatePlayer';
import './style.css';
import './collectUserInput';

const scene = new THREE.Scene();
const camera = Camera()
const dirLight = DirectionalLight()

scene.add(player)
scene.add(map)
scene.add(dirLight)

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

initGame()
function initGame() {
  initMap()
}

const renderer = Renderer()

function animate() {
  animateVehicles()
  animatePlayer();

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate)
