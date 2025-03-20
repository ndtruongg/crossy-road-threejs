import * as THREE from 'three'
import { Grass } from './Grass'
import { Tree } from './Tree'
import { Row } from '../types';
import { Road } from './Road';
import { Car } from './Car';
import { Truck } from './Truck';

export const map = new THREE.Group();

export const metadata: Row[] = [
  {
    type: 'forest',
    trees: [
      { tileIndex: -3, height: 50 },
      { tileIndex: 3, height: 30 },
      { tileIndex: 5, height: 40 },
    ],
  },
  {
    type: 'car',
    direction: false,
    speed: 1,
    vehicles: [
      { initialTileIndex: 2, color: 0xff0000 },
      { initialTileIndex: 4, color: 0xff0000 },
    ],
  },
  {
    type: 'truck',
    direction: true,
    speed: 1,
    vehicles: [
      { initialTileIndex: 2, color: 0x00ff00 },
      { initialTileIndex: -4, color: 0x00ff00 },
    ],
  },
];

export function initMap() {
  const grass = Grass(0)
  map.add(grass)
  addRows();
}

export function addRows() {
  metadata.forEach((rowData, index) => {
    const rowIndex = index + 1

    if (rowData.type === 'forest') {
      const row = Grass(rowIndex)

      rowData.trees.forEach((treeData) => {
        const tree = Tree(treeData.tileIndex, treeData.height);
        row.add(tree);
      })

      map.add(row)
    }

    if (rowData.type === 'car') {
      const row = Road(rowIndex)

      rowData.vehicles.forEach((vehicleData) => {
        const car = Car(
          vehicleData.initialTileIndex,
          rowData.direction,
          vehicleData.color
        )
        row.add(car)
      })

      map.add(row)
    }

    if (rowData.type === 'truck') {
      const row = Road(rowIndex)

      rowData.vehicles.forEach((vehicleData) => {
        const truck = Truck(
          vehicleData.initialTileIndex,
          rowData.direction,
          vehicleData.color
        )

        row.add(truck)
      })

      map.add(row)
    }
  })
}
