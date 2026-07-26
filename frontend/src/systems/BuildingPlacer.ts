import Phaser from 'phaser';
import { Village } from '../domain/Village';
import { createBuilding } from '../domain/BuildingRegistry';
import { TILE_SIZE } from './GridRenderer';
import type { GridMap } from '../domain/GridMap.ts';
import type { Building } from '../domain/Building';

export class BuildingPlacer {
  private selectedType = '';
  private mode: 'build' | 'delete' = 'build';
  private sprites = new Map<Building, Phaser.GameObjects.Image>();
  constructor(
    private scene: Phaser.Scene,
    private village: Village,
    private gridMap: GridMap
  ) {}

  selectType(key: string): void {
    this.selectedType = key;
  }
  enterDeleteMode(): void {
    this.mode = 'delete';
  }
  enterBuildMode(): void {
    this.mode = 'build';
  }
  enable(): void {
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
      const gridX = Math.floor(worldPoint.x / TILE_SIZE);
      const gridY = Math.floor(worldPoint.y / TILE_SIZE);
      const tile = this.gridMap.getTile(gridX, gridY);

      if (this.mode === 'delete') {
        const building = this.village.removeBuildingAt(gridX, gridY);
        if (building) {
          const img = this.sprites.get(building);
          img?.destroy();
          this.sprites.delete(building);
          this.village.recalculateCapacities();
          console.log('Building removed');
        }
        return;
      }

      if (!this.selectedType) {
        return;
      }

      if (this.village.getBuildingAt(gridX, gridY)) {
        console.log('Tile already occupied');
        return;
      }
      if (!tile || tile.type === 'border') {
        console.log('Cannot place building on border tile');
        return;
      }

      const building = createBuilding(this.selectedType, gridX, gridY);
      const cost = building.getCost();

      if (!this.village.resources.canAfford(cost)) {
        console.log('Not enough resources');
        return;
      }
      this.village.resources.spend(cost);
      this.village.addBuilding(building);
      this.village.recalculateCapacities();

      const img = this.scene.add.image(
        gridX * TILE_SIZE + TILE_SIZE / 2,
        gridY * TILE_SIZE + TILE_SIZE / 2,
        building.getSpriteKey()
      );
      img.setDisplaySize(TILE_SIZE, TILE_SIZE);
      this.sprites.set(building, img);
    });
  }
}