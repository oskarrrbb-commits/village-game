import Phaser from 'phaser';
import { GridMap } from '../domain/GridMap';

export const TILE_SIZE = 64;

export class GridRenderer {
  constructor(private scene: Phaser.Scene, private gridMap: GridMap) {}

  render(): void {
    for (let y = 0; y < this.gridMap.height; y++) {
      for (let x = 0; x < this.gridMap.width; x++) {
        const tile = this.gridMap.getTile(x, y)!;
        const img = this.scene.add.image(
          x * TILE_SIZE + TILE_SIZE / 2,
          y * TILE_SIZE + TILE_SIZE / 2,
          tile.type
        );
        img.setDisplaySize(TILE_SIZE, TILE_SIZE);
      }
    }
  }
}