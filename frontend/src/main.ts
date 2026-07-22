import Phaser from 'phaser';
import { VillageScene } from './scenes/VillageScene';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  backgroundColor: '#2d2d2d',
  scene: VillageScene,
});