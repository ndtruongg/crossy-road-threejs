import * as THREE from 'three'
import { MoveDirection } from '../types';
import { metadata as rows, addRows } from './Map'
import { endsUpInValidPosition } from '../utils/endsUpInValidPosition';

export const player = Player()

export function Player() {
  const player = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 20),
    new THREE.MeshLambertMaterial({
      color: 'white',
      flatShading: true
    })
  )

  body.position.z = 10;
  body.castShadow = true;
  body.receiveShadow = true;
  player.add(body);

  const cap = new THREE.Mesh(
    new THREE.BoxGeometry(2, 4, 2),
    new THREE.MeshLambertMaterial({
      color: 0xf0619a,
      flatShading: true
    })
  );
  cap.castShadow = true;
  cap.receiveShadow = true;
  cap.position.z = 21;
  player.add(cap);

  const playerContainer = new THREE.Group();
  playerContainer.add(player)

  return playerContainer;
}

export const position: {
  currentRow: number;
  currentTile: number;
} = {
  currentRow: 0,
  currentTile: 0,
}

export const movesQueue: MoveDirection[] = []

export function queueMove(direction: MoveDirection) {
  const isValidMove = endsUpInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile
    },
    [...movesQueue, direction]
  )

  if (!isValidMove) return

  movesQueue.push(direction)
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  switch (direction) {
    case 'forward':
      position.currentRow += 1;
      break;
    case 'backward':
      position.currentRow -= 1;
      break;
    case 'left':
      position.currentTile -= 1;
      break;
    case 'right':
      position.currentTile += 1;
      break;
  
    default:
      break;
  }

  if (position.currentRow > rows.length - 10) addRows()
  
  const scoreDOM = document.getElementById('score')
  if (scoreDOM) scoreDOM.innerText = position.currentRow.toString()
}

export function initializePlayer() {
  player.position.x = 0;
  player.position.y = 0;
  player.children[0].position.z = 0;

  position.currentRow = 0;
  position.currentTile = 0;

  movesQueue.length = 0;
}
