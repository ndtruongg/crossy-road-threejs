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
scene.add(player)
scene.add(map)

const dirLight = DirectionalLight()
scene.add(dirLight)

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const camera = Camera();
player.add(camera);

initGame()
function initGame() {
  initMap()
}

const renderer = Renderer()
renderer.setAnimationLoop(animate);

function animate() {
  animateVehicles()
  animatePlayer();

  renderer.render(scene, camera);
}
