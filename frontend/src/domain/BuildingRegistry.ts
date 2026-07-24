import { Building, House, Farm } from './Building';

type BuildingConstructor = new (gridX: number, gridY: number) => Building;

const registry: Record<string, BuildingConstructor> = {
  house: House,
  farm: Farm,
};

export function createBuilding(key: string, gridX: number, gridY: number): Building {
  const Ctor = registry[key];
  if (!Ctor) {
    throw new Error(`Unknown building type: ${key}`);
  }
  return new Ctor(gridX, gridY);
}