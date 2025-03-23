import * as THREE from 'three';
import { Camera } from './components/Camera'
import { player, initializePlayer } from './components/Player';
import { map, initMap } from './components/Map';
import { Renderer } from './components/Renderer';
import { DirectionalLight } from './components/DirectionLight';
import { animateVehicles } from './animateVehicles';
import { animatePlayer } from './animatePlayer';
import { hitTest } from './hitTest'
import './style.css';
import './collectUserInput';

const scoreDOM = document.getElementById("score")
const resultDOM = document.getElementById("result-container")

const scene = new THREE.Scene();
scene.add(player)
scene.add(map)

const dirLight = DirectionalLight()
dirLight.target = player
player.add(dirLight)

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const camera = Camera();
player.add(camera);

document.querySelector('#retry')?.addEventListener('click', initGame);
initGame()
function initGame() {
  initMap()
  initializePlayer()

  if (scoreDOM) scoreDOM.innerText = "0"
  if (resultDOM) resultDOM.style.visibility = "hidden"
}

const renderer = Renderer()
renderer.setAnimationLoop(animate);

function animate() {
  animateVehicles()
  animatePlayer();
  hitTest()

  renderer.render(scene, camera);
}
