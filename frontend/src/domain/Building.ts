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
}

export class House extends Building {
  getSpriteKey(): string {
    return 'house';
  }
  getCost(): ResourceDrop[] { return []; }
  getStorageBonus(): ResourceDrop[] {
  return [{ type: 'population', amount: 4 }];
}
}

export class Farm extends Building {
  getSpriteKey(): string {
    return 'farm';
  }
  produce(): ResourceDrop | null {
    const perTick = 1/3; 
    return { type: 'wheat', amount: 1/perTick };
  }
  getCost(): ResourceDrop[] { return [{ type: 'wood', amount: 5 }]; }

  getStorageBonus(): ResourceDrop[] {
  return [{ type: 'wheat', amount: 10 }];
}
}

export class Mine extends Building { 
  getSpriteKey(): string {
    return 'mine';
  }
  produce(): ResourceDrop | null {
    const perTick = 1/5;
    return { type: 'coal', amount: 1/perTick };
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
    const perTick = 1/5;
    return { type: 'wood', amount: 1/perTick };
  }
  getCost(): ResourceDrop[] { return [{ type: 'wood', amount: 5 }]; }
  getStorageBonus(): ResourceDrop[] {
  return [{ type: 'wood', amount: 10 }];
  }
}