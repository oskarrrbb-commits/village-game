import Phaser from 'phaser';
import { BuildingPlacer } from './BuildingPlacer';

interface ActionEntry {
  label: string;
  onClick: (placer: BuildingPlacer) => void;
}

const ACTION_ENTRIES: ActionEntry[] = [
  { label: 'Delete', onClick: (placer) => placer.enterDeleteMode() },
  { label: 'Build', onClick: (placer) => placer.enterBuildMode() },
];

export class ActionMenu {
  constructor(private scene: Phaser.Scene, private placer: BuildingPlacer) {}

  create(): void {
    const startX = this.scene.scale.width - 120;
    const startY = 20;
    const spacing = 40;

    ACTION_ENTRIES.forEach((entry, index) => {
      const button = this.scene.add.text(startX, startY + index * spacing, entry.label, {
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 8, y: 4 },
      });

      button.setScrollFactor(0);
      button.setDepth(100);
      button.setInteractive({ useHandCursor: true });
      button.on('pointerdown', (_pointer: Phaser.Input.Pointer, _localX: number, _localY: number, event: Phaser.Types.Input.EventData) => {
        entry.onClick(this.placer);
        event.stopPropagation();
      });
    });
  }
}