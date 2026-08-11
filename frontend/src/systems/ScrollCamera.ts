import Phaser from 'phaser';

export class EdgeScrollCamera {
  private pointerInside = true;
  private zoomStep = 0.1;
  private minZoom = 0.7;
  private maxZoom = 1.7;
  constructor(
    private scene: Phaser.Scene,
    private margin: number = 120,
    private speed: number = 8
  ) {
    this.scene.input.on('gameout', () => { this.pointerInside = false; });
    this.scene.input.on('gameover', () => { this.pointerInside = true; });
    this.scene.input.on('wheel', (_pointer: Phaser.Input.Pointer, _gameObjects: unknown, _dx: number, dy: number) => {
    const cam = this.scene.cameras.main;
    const newZoom = dy > 0 ? cam.zoom - this.zoomStep : cam.zoom + this.zoomStep;
    cam.zoom = Phaser.Math.Clamp(newZoom, this.minZoom, this.maxZoom);
});
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