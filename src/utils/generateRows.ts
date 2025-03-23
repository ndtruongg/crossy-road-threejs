import * as THREE from 'three'
import { minTileIndex, maxTileIndex } from '../constants'
import type {Row, RowType} from '../types'

export function generateRows(amount: number): Row[] {
  const rows: Row[] = []
  for (let i = 0; i < amount; i++) {
    const rowData = generateRow()
    rows.push(rowData)
  }

  return rows
}

function generateRow(): Row {
  const type: RowType = randomElement(['car', 'forest', 'truck'])
  if (type === 'car') return generateCarLaneMetaData()
  if (type === 'truck') return generateTruckLaneMetaData()
  return generateForestLaneMetaData()
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function generateForestLaneMetaData(): Row {
  const occupiedTiles = new Set<number>()
  const trees = Array.from({ length: 4 }, () => {
    let tileIndex;
    do {
      tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
    } while (occupiedTiles.has(tileIndex))
    occupiedTiles.add(tileIndex)

    const height = randomElement([20, 45, 60])

    return { tileIndex, height }
  })

  return {
    type: 'forest',
    trees
  }
}

function generateCarLaneMetaData(): Row {
  const direction = randomElement([true, false])
  const speed = randomElement([125, 188, 222, 255])

  const occupiedTiles = new Set<number>()

  const vehicles = Array.from({ length: 3}, () => {
    let initialTileIndex;
    do {
      initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex)
    } while (occupiedTiles.has(initialTileIndex))
    occupiedTiles.add(initialTileIndex - 1)
    occupiedTiles.add(initialTileIndex)
    occupiedTiles.add(initialTileIndex + 1)

    const color: THREE.ColorRepresentation = randomElement([
      0xa52523, 0xbdb638, 0x78b14b,
    ]);
    
    return { initialTileIndex, color }
  })

  return { type: 'car', direction, speed, vehicles }
}

function generateTruckLaneMetaData(): Row {
  const direction = randomElement([true, false])
  const speed = randomElement([125, 188, 222, 255, 321])

  const occupiedTiles = new Set<number>()

  const vehicles = Array.from({ length: 3}, () => {
    let initialTileIndex;
    do {
      initialTileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex)
    } while (occupiedTiles.has(initialTileIndex))
    occupiedTiles.add(initialTileIndex - 2)
    occupiedTiles.add(initialTileIndex - 1)
    occupiedTiles.add(initialTileIndex)
    occupiedTiles.add(initialTileIndex + 1)
    occupiedTiles.add(initialTileIndex + 2)

    const color: THREE.ColorRepresentation = randomElement([
      0xa52523, 0xbdb638, 0x78b14b,
    ]);
    
    return { initialTileIndex, color }
  })

  return {
    type: 'truck',
    direction,
    speed,
    vehicles
  }
}
