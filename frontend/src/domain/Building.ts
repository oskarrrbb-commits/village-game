export interface ResourceDrop {
  type: string;
  amount: number;
}
export abstract class Building {
  constructor(public gridX: number, public gridY: number) {}
  abstract getSpriteKey(): string;
  produce(): ResourceDrop | null {
    return null;   
  }
}

export class House extends Building {
  getSpriteKey(): string {
    return 'house';
  }
}
export class Farm extends Building {
  getSpriteKey(): string {
    return 'farm';
  }
  produce(): ResourceDrop | null {
    return { type: 'wheat', amount: 1 };
  }
  
}
export class Mine extends Building {
  getSpriteKey(): string {
    return 'mine';
  }
  produce(): ResourceDrop | null {
    return { type: 'coal', amount: 1 };
  }
  
}