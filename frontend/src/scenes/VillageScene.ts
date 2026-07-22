import Phaser from 'phaser';

export class VillageScene extends Phaser.Scene {
  constructor() {
    super('VillageScene');
  }
  
    preload() {
        
        this.load.image('logo', 'src/assets/testimage.png');
    }

    create() {

        const logo = this.add.image(400, 300, 'logo');
        
        logo.setOrigin(0.5, 0.5); 
    }
    
  }
