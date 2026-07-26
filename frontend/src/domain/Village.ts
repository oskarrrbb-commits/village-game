import { Building } from './Building';
import { Resources } from './Resources';
import type { VillageDTO, BuildingDTO } from '../api/types';
import { createBuilding } from './BuildingRegistry';

export class Village {
  buildings: Building[] = [];
  resources = new Resources();
  
  static fromDTO(dto: VillageDTO): Village {
  const village = new Village();

  for (const b of dto.buildings) {
    const building = createBuilding(b.type, b.gridX, b.gridY);
    village.addBuilding(building);
  }

  for (const [type, amount] of Object.entries(dto.resources)) {
    village.resources.add(type, amount);
  }

  return village;
  }

  toDTO(): VillageDTO {
  const buildingDTOs: BuildingDTO[] = this.buildings.map(b => ({
    type: b.getSpriteKey(),
    gridX: b.gridX,
    gridY: b.gridY,
  }));

  return {
    resources: this.resources.getAll(),
    buildings: buildingDTOs,
  };
  }
  addBuilding(building: Building): void {
    this.buildings.push(building);
  }

  getBuildingAt(gridX: number, gridY: number): Building | undefined {
    return this.buildings.find(b => b.gridX === gridX && b.gridY === gridY);
  }
  removeBuildingAt(gridX: number, gridY: number): Building | undefined {
    const building = this.getBuildingAt(gridX, gridY);
    if (building) {
      this.buildings = this.buildings.filter(b => b !== building);
    }
    return building;
  }
  tick(): void {
    for (const building of this.buildings) {
      const drop = building.produce();
      if (drop) {
        this.resources.add(drop.type, drop.amount);
      }
    }
  }
}