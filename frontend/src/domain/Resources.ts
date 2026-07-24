import type { ResourceDrop } from './Building.ts';

export type ResourceType = 'wheat'|'coal';

export class Resources {
  private amounts: Record<string, number> = {};

  add(type: string, amount: number): void {
    this.amounts[type] = (this.amounts[type] ?? 0) + amount;
  }
  get(type: string): number {
    return this.amounts[type] ?? 0;
  }
canAfford(cost: ResourceDrop[]): boolean {
  return cost.every(c => this.get(c.type) >= c.amount);
}

spend(cost: ResourceDrop[]): void {
  for (const c of cost) {
    this.amounts[c.type] -= c.amount;
  }
}
}