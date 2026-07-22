import Phaser from 'phaser';

export class EdgeScrollCamera {
  constructor(
    private scene: Phaser.Scene,
    private margin: number = 40,
    private speed: number = 8
  ) {}

  update(): void {
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