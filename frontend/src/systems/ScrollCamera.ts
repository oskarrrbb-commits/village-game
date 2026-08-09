import Phaser from 'phaser';

export class EdgeScrollCamera {
  private pointerInside = true;
  constructor(
    private scene: Phaser.Scene,
    private margin: number = 120,
    private speed: number = 8
  ) {
    this.scene.input.on('gameout', () => { this.pointerInside = false; });
    this.scene.input.on('gameover', () => { this.pointerInside = true; });
  }

  update(): void {
    if (!this.pointerInside) return;
    const cam = this.scene.cameras.main;
    const pointer = this.scene.input.activePointer;

    if (pointer.x < this.margin) {
      cam.scrollX -= this.speed;
    } else if (pointer.x > this.scene.scale.width - this.margin) {
      cam.scrollX += this.speed;
    }

    if (pointer.y < this.margin) {
      cam.scrollY -= this.speed;
    } else if (pointer.y > this.scene.scale.height - this.margin) {
      cam.scrollY += this.speed;
    }
  }
}