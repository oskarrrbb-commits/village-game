import Phaser from 'phaser';
import { Village } from '../domain/Village';
import { createBuilding } from '../domain/BuildingRegistry';
import { TILE_SIZE } from './GridRenderer';

export class BuildingPlacer {
  private selectedType = 'house'; 

  constructor(private scene: Phaser.Scene, private village: Village) {}

  selectType(key: string): void {
    this.selectedType = key;
  }

  enable(): void {
    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = this.scene.cameras.main.getWorldPoint(pointer.x, pointer.y);
      const gridX = Math.floor(worldPoint.x / TILE_SIZE);
      const gridY = Math.floor(worldPoint.y / TILE_SIZE);

      if (this.village.getBuildingAt(gridX, gridY)) {
        console.log('Tile already occupied');
        return;
      }

      const building = createBuilding(this.selectedType, gridX, gridY);
      this.village.addBuilding(building);

      const img = this.scene.add.image(
        gridX * TILE_SIZE + TILE_SIZE / 2,
        gridY * TILE_SIZE + TILE_SIZE / 2,
        building.getSpriteKey()
      );
      img.setDisplaySize(TILE_SIZE, TILE_SIZE);
    });
  }
}