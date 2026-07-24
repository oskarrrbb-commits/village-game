import Phaser from 'phaser';
import { GridMap } from '../domain/GridMap.ts';
import { Village } from '../domain/Village.ts';
import { EdgeScrollCamera } from '../systems/ScrollCamera';
import { loadAllAssets } from '../systems/AssetLoad.ts';
import { BuildingPlacer } from '../systems/BuildingPlacer';
import { GridRenderer, TILE_SIZE } from '../systems/GridRenderer';

export class VillageScene extends Phaser.Scene {
  private gridMap = new GridMap(40, 30);
  private village = new Village();
  private edgeScroll!: EdgeScrollCamera;

  constructor() {
    super('VillageScene');
  }

  preload(): void {
    loadAllAssets(this);
  }

  create(): void {
    new GridRenderer(this, this.gridMap).render();

    const worldWidth = this.gridMap.width * TILE_SIZE;
    const worldHeight = this.gridMap.height * TILE_SIZE;
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    this.edgeScroll = new EdgeScrollCamera(this);
    new BuildingPlacer(this, this.village).enable();
    
    this.time.addEvent({
    delay: 1000,
    callback: () =>{
    this.village.tick();
    console.log('wheat:', this.village.resources.get('wheat'));
    },
    loop: true,
    });

  }

  update(): void {
    this.edgeScroll.update();
  }
}