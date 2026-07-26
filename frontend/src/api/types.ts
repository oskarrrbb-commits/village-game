export interface BuildingDTO {
  type: string;
  gridX: number;
  gridY: number;
}

export interface VillageDTO {
  resources: Record<string, number>;
  buildings: BuildingDTO[];
}