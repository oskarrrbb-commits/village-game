import Phaser from 'phaser';
import { BuildingPlacer } from './BuildingPlacer';
import { Village } from '../domain/Village';
import { saveVillage } from '../api/client.ts';
import { ResourceDisplay } from './ResourceDisplay';

interface ActionEntry {
  label: string;
  onClick: (placer: BuildingPlacer, village: Village) => void;
}

const ACTION_ENTRIES: ActionEntry[] = [
  { label: 'Delete', onClick: (placer) => placer.enterDeleteMode() },
  { label: 'Build', onClick: (placer) => placer.enterBuildMode() },
  {
    label: 'Save',
    onClick: async (_placer, village) => {
      await saveVillage(village.toDTO());
      console.log('Village saved');
    },
  },
];

export class ActionMenu {
  private resourceDisplay: ResourceDisplay;
  constructor(
    private scene: Phaser.Scene,
    private placer: BuildingPlacer,
    private village: Village
  ) {this.resourceDisplay = new ResourceDisplay(scene, village);}
  
  create(): void {
    const startX = this.scene.scale.width - 120;
    const startY = 50;
    const spacing = 50;

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
        entry.onClick(this.placer, this.village);
        event.stopPropagation();
      });
    });
  }
  refreshResources(): void {
    this.resourceDisplay.refresh();
  }
}