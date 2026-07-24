import Phaser from 'phaser';
import { BuildingPlacer } from './BuildingPlacer';

interface MenuEntry {
  label: string;
  buildingKey: string;
}

const MENU_ENTRIES: MenuEntry[] = [
  { label: 'House', buildingKey: 'house' },
  { label: 'Farm', buildingKey: 'farm' },
  { label: 'Mine', buildingKey: 'mine' },
  { label: 'Nothing', buildingKey: '' },

];

export class BuildMenu {
  constructor(private scene: Phaser.Scene, private placer: BuildingPlacer) {}

  create(): void {
    const startX = 20;
    const startY = 20;
    const spacing = 40;

    MENU_ENTRIES.forEach((entry, index) => {
      const button = this.scene.add.text(startX, startY + index * spacing, entry.label, {
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 8, y: 4 },
      });

      button.setScrollFactor(0);
      button.setDepth(100);
      button.setInteractive({ useHandCursor: true });
      button.on('pointerdown', () => this.placer.selectType(entry.buildingKey));
    });
  }
}