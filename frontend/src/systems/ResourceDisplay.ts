import Phaser from 'phaser';
import { Village } from '../domain/Village';

export class ResourceDisplay {
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, private village: Village) {
    this.text = scene.add.text(100, 300, '', {
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 },
    });
    this.text.setScrollFactor(0);
    this.text.setDepth(100);
    this.refresh();
  }

  refresh(): void {
    const r = this.village.resources;
    this.text.setText(
      `Wheat: ${Math.floor(r.get('wheat'))}/${Math.floor(r.getCapacity('wheat'))}\n` +
      `Coal: ${Math.floor(r.get('coal'))}/${Math.floor(r.getCapacity('coal'))}\n` +
      `Wood: ${Math.floor(r.get('wood'))}/${Math.floor(r.getCapacity('wood'))}\n` +
      `Population: ${Math.floor(r.get('population'))}/${Math.floor(r.getCapacity('population'))}`
    );
  }
}