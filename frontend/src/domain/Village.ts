import { Building, Farm } from './Building';
import { Resources } from './Resources';

export class Village {
  buildings: Building[] = [];
  resources = new Resources();

  addBuilding(building: Building): void {
    this.buildings.push(building);
  }

  getBuildingAt(gridX: number, gridY: number): Building | undefined {
    return this.buildings.find(b => b.gridX === gridX && b.gridY === gridY);
  }

  tick(): void {
    for (const building of this.buildings) {
      if (building instanceof Farm) {
        const { type, amount } = building.produce();
        this.resources.add(type, amount);
      }
    }
  }
}