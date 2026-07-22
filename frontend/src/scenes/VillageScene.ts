import Phaser from 'phaser';
import { GridMap } from '../domain/GridMap';
import { EdgeScrollCamera } from '../systems/ScrollCamera';

const TILE_SIZE = 64;

export class VillageScene extends Phaser.Scene {
  private gridMap = new GridMap(40, 30);
  private edgeScroll!: EdgeScrollCamera;

  constructor() {
    super('VillageScene');
  }

  preload(): void {
    this.load.image('grass', 'assets/trawa.png');
    this.load.image('border', 'assets/border.png');
  }

  create(): void {
    for (let y = 0; y < this.gridMap.height; y++) {
      for (let x = 0; x < this.gridMap.width; x++) {
        const tile = this.gridMap.getTile(x, y)!;

        const img = this.add.image(
          x * TILE_SIZE + TILE_SIZE / 2,
          y * TILE_SIZE + TILE_SIZE / 2,
          tile.type
        );
        img.setDisplaySize(TILE_SIZE, TILE_SIZE);
      }
    }

    const worldWidth = this.gridMap.width * TILE_SIZE;
    const worldHeight = this.gridMap.height * TILE_SIZE;
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    this.edgeScroll = new EdgeScrollCamera(this);
  }

  update(): void {
    this.edgeScroll.update();
  }
}