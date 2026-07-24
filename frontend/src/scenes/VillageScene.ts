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
    const placer = new BuildingPlacer(this, this.village);
    placer.enable();
    this.input.keyboard!.on('keydown-ONE', () => placer.selectType(''));
    this.input.keyboard!.on('keydown-TWO', () => placer.selectType('house'));
    this.input.keyboard!.on('keydown-THREE', () => placer.selectType('farm'));
    this.input.keyboard!.on('keydown-FOUR', () => placer.selectType('mine'));
    const worldWidth = this.gridMap.width * TILE_SIZE;
    const worldHeight = this.gridMap.height * TILE_SIZE;
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    this.edgeScroll = new EdgeScrollCamera(this);
    new BuildingPlacer(this, this.village).enable();

    const ResourceText = this.add.text(100, 100, `Wheat: ${this.village.resources.get('wheat')}`);
    ResourceText.setScrollFactor(0);

    this.time.addEvent({
    delay: 1000,
    callback: () =>{
    this.village.tick();
    ResourceText.setText(`Wheat: ${this.village.resources.get('wheat')} \nCoal: ${this.village.resources.get('coal')}`);
    },
    loop: true,
    });

  }

  update(): void {
    this.edgeScroll.update();
  }
}