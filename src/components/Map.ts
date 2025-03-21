import * as THREE from 'three';
import { Grass } from './Grass';
import { Tree } from './Tree';
import { Row } from '../types';
import { Road } from './Road';
import { Car } from './Car';
import { Truck } from './Truck';

export const map = new THREE.Group();

export const metadata: Row[] = [
  {
    type: 'car',
    direction: false,
    speed: 188,
    vehicles: [
      { initialTileIndex: -4, color: 0xbdb638 },
      { initialTileIndex: -1, color: 0x78b14b },
      { initialTileIndex: 4, color: 0xa52523 },
    ],
  },
  {
    type: 'forest',
    trees: [
      { tileIndex: -5, height: 50 },
      { tileIndex: 0, height: 30 },
      { tileIndex: 3, height: 50 },
    ],
  },
  {
    type: 'truck',
    direction: true,
    speed: 125,
    vehicles: [
      { initialTileIndex: -4, color: 0x78b14b },
      { initialTileIndex: 0, color: 0xbdb638 },
    ],
  },
  {
    type: 'forest',
    trees: [
      { tileIndex: -8, height: 30 },
      { tileIndex: -3, height: 50 },
      { tileIndex: 2, height: 30 },
    ],
  },
];

export function initMap() {
  for(let rowIndex = 0; rowIndex < -5; rowIndex--) {
    const grass = Grass(rowIndex);
    map.add(grass);
  }
  addRows();
}

export function addRows() {
  metadata.forEach((rowData, index) => {
    const rowIndex = index + 1;

    if (rowData.type === 'forest') {
      const row = Grass(rowIndex);

      rowData.trees.forEach((treeData) => {
        const tree = Tree(treeData.tileIndex, treeData.height);
        row.add(tree);
      });

      map.add(row);
    }

    if (rowData.type === 'car') {
      const row = Road(rowIndex);

      rowData.vehicles.forEach((vehicleData) => {
        const car = Car(
          vehicleData.initialTileIndex,
          rowData.direction,
          vehicleData.color
        );
        vehicleData.ref = car;
        row.add(car);
      });

      map.add(row);
    }

    if (rowData.type === 'truck') {
      const row = Road(rowIndex);

      rowData.vehicles.forEach((vehicleData) => {
        const truck = Truck(
          vehicleData.initialTileIndex,
          rowData.direction,
          vehicleData.color
        );
        vehicleData.ref = truck;
        row.add(truck);
      });

      map.add(row);
    }
  });
}
