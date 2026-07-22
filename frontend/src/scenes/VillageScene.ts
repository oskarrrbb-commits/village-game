import Phaser from 'phaser';

export class VillageScene extends Phaser.Scene {
  constructor() {
    super('VillageScene');
  }
  create() {
    this.add.text(50, 50, 'Village Scene', { color: '#ffffff' });
  }
}