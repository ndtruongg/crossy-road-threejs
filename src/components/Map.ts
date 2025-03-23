import * as THREE from 'three';
import { Grass } from './Grass';
import { Tree } from './Tree';
import { Row } from '../types';
import { Road } from './Road';
import { Car } from './Car';
import { Truck } from './Truck';
import { generateRows } from '../utils/generateRows';

export const map = new THREE.Group();

export const metadata: Row[] = [];

export function initMap() {
  metadata.length = 0;
  map.remove(...map.children);

  for (let rowIndex = 0; rowIndex > -5; rowIndex--) {
    const grass = Grass(rowIndex);
    map.add(grass);
  }
  addRows();
}

export function addRows() {
  const newMetadata = generateRows(20)
  const startIndex = metadata.length
  metadata.push(...newMetadata)

  newMetadata.forEach((rowData, index) => {
    const rowIndex = startIndex + index + 1;

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
