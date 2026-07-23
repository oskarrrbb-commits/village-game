import { Building } from './Building';

export class Village {
  buildings: Building[] = [];

  addBuilding(building: Building): void {
    this.buildings.push(building);
  }

  getBuildingAt(gridX: number, gridY: number): Building | undefined {
    return this.buildings.find(b => b.gridX === gridX && b.gridY === gridY);
  }
}