import Phaser from 'phaser';
import { GridMap } from '../domain/GridMap.ts';
import { Village } from '../domain/Village.ts';
import { House } from '../domain/Building.ts';
import { EdgeScrollCamera } from '../systems/ScrollCamera';

const TILE_SIZE = 64;

export class VillageScene extends Phaser.Scene {
  private gridMap = new GridMap(40, 30);
  private village = new Village();
  private edgeScroll!: EdgeScrollCamera;

  constructor() {
    super('VillageScene');
  }

  preload(): void {
    this.load.image('grass', 'assets/grass.png');
    this.load.image('house', 'assets/house.png');
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

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
      const gridX = Math.floor(worldPoint.x / TILE_SIZE);
      const gridY = Math.floor(worldPoint.y / TILE_SIZE);

      if (this.village.getBuildingAt(gridX, gridY)) {
        console.log('Tile already occupied');
        return;
      }

      const house = new House(gridX, gridY);
      this.village.addBuilding(house);

      const img = this.add.image(
        gridX * TILE_SIZE + TILE_SIZE / 2,
        gridY * TILE_SIZE + TILE_SIZE / 2,
        house.getSpriteKey()
      );
      img.setDisplaySize(TILE_SIZE, TILE_SIZE);

      console.log(`Placed house at (${gridX}, ${gridY})`);
    });
  }

  update(): void {
    this.edgeScroll.update();
  }
}