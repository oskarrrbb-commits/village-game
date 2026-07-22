import Phaser from 'phaser';
import { VillageScene } from './scenes/VillageScene';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 1440,
  height: 768,
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  parent: 'game-container',
  backgroundColor: '#2d2d2d',
  scene: VillageScene,
});