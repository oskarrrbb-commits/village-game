export abstract class Building {
  constructor(public gridX: number, public gridY: number) {}
  abstract getSpriteKey(): string;
}

export class House extends Building {
  getSpriteKey(): string {
    return 'house';
  }
}