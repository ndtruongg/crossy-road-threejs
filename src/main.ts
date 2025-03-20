import * as THREE from 'three';
import { Camera } from './components/Camera'
import { Player } from './components/Player';
import { map, initMap } from './components/Map';
import { Renderer } from './components/Renderer';
import { DirectionalLight } from './components/DirectionLight';
import './style.css';

const scene = new THREE.Scene();
const camera = Camera()
const player = Player()
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
renderer.render(scene, camera);
