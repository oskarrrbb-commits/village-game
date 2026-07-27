import Phaser from 'phaser';
import { GridMap } from '../domain/GridMap.ts';
import { Village } from '../domain/Village.ts';
import { EdgeScrollCamera } from '../systems/ScrollCamera';
import { loadAllAssets } from '../systems/AssetLoad.ts';
import { BuildingPlacer } from '../systems/BuildingPlacer';
import { GridRenderer, TILE_SIZE } from '../systems/GridRenderer';
import { BuildMenu } from '../systems/BuildMenu.ts';
import { ActionMenu } from '../systems/ActionMenu.ts';
import { fetchVillage } from '../api/client.ts';

export class VillageScene extends Phaser.Scene {
  private gridMap = new GridMap(40, 30);
  private village = new Village();
  private edgeScroll!: EdgeScrollCamera;

  constructor() {
      super('VillageScene');
      this.village.resources.setBaseCapacity('wheat', 10);
      this.village.resources.setBaseCapacity('coal', 10);
      this.village.resources.setBaseCapacity('wood', 10);
      this.village.resources.add('wood', 5);

      }

  preload(): void {
    loadAllAssets(this);
  }
  private async loadInitialVillage(): Promise<void> {
  try {
    const dto = await fetchVillage();
    this.village = Village.fromDTO(dto);
  } catch (e) {
    console.log('No saved village found, starting fresh');
  }
}
  create(): void {
    this.loadInitialVillage();
    new GridRenderer(this, this.gridMap).render();
    const placer = new BuildingPlacer(this, this.village, this.gridMap);
    placer.enable();
    const buildMenu = new BuildMenu(this, placer);
    buildMenu.create();

    const worldWidth = this.gridMap.width * TILE_SIZE;
    const worldHeight = this.gridMap.height * TILE_SIZE;
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);

    this.edgeScroll = new EdgeScrollCamera(this);

    const actionMenu = new ActionMenu(this, placer, this.village);
    actionMenu.create();
    
    const ResourceText = this.add.text(100, 300, `Wheat: ${this.village.resources.get('wheat')}`);
    ResourceText.setScrollFactor(0);
    ResourceText.setDepth(100);

    this.time.addEvent({
    delay: 1000,
    callback: () =>{
    this.village.tick();
    ResourceText.setText(`Wheat: ${Math.floor(this.village.resources.get('wheat'))}/${Math.floor(this.village.resources.getCapacity('wheat'))} \nCoal: ${Math.floor(this.village.resources.get('coal'))}/${Math.floor(this.village.resources.getCapacity('coal'))} \nWood: ${Math.floor(this.village.resources.get('wood'))}/${Math.floor(this.village.resources.getCapacity('wood'))} \nPopulation: ${Math.floor(this.village.resources.get('population'))}/${Math.floor(this.village.resources.getCapacity('population'))}`);
    },
    loop: true,
    });

  }

  update(): void {
    this.edgeScroll.update();
  }
}