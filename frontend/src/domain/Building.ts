export interface ResourceDrop {
  type: string;
  amount: number;
}

export abstract class Building {
  constructor(public gridX: number, public gridY: number) {}
  abstract getSpriteKey(): string;
  abstract getCost(): ResourceDrop[];
  produce(): ResourceDrop | null {
    return null;   
  }
  getStorageBonus(): ResourceDrop[] {
    return [];
  }
  produceOnce(): ResourceDrop[] {
    return [];
  }
}

export class House extends Building {
  getSpriteKey(): string {
    return 'house';
  }
  getCost(): ResourceDrop[] { return []; }
  getStorageBonus(): ResourceDrop[] {
  return [{ type: 'population', amount: 4 }];
}
  produceOnce(): ResourceDrop[] {
    return [{ type: 'population', amount: 4 }];
  }
}

export class Farm extends Building {
  getSpriteKey(): string {
    return 'farm';
  }
  produce(): ResourceDrop | null {
    const delay = 1; 
    return { type: 'wheat', amount: 1/delay};
  }
  getCost(): ResourceDrop[] { return [{ type: 'wood', amount: 5 },{ type: 'population', amount: 2 }]; }

  getStorageBonus(): ResourceDrop[] {
  return [{ type: 'wheat', amount: 5 }];
}
}

export class Mine extends Building { 
  getSpriteKey(): string {
    return 'mine';
  }
  produce(): ResourceDrop | null {
    const delay = 3;
    return { type: 'coal', amount: 1/delay };
  }
  getCost(): ResourceDrop[] { return [{ type: 'wheat', amount: 5 },{ type: 'wood', amount: 5 }]; }

  getStorageBonus(): ResourceDrop[] {
  return [{ type: 'coal', amount: 10 }];
}
}

export class Lumberjack extends Building {
  getSpriteKey(): string {
    return 'lumberjack';
  }
  produce(): ResourceDrop | null {
    const delay = 3;
    return { type: 'wood', amount: 1/delay };
  }
  getCost(): ResourceDrop[] { return [{ type: 'wheat', amount: 5 }]; }
  getStorageBonus(): ResourceDrop[] {
  return [{ type: 'wood', amount: 10 }];
  }
}