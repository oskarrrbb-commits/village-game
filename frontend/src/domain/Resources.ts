import type { ResourceDrop } from './Building.ts';

export type ResourceType = 'wheat'|'coal'|'wood'|'population';

export class Resources {
  private baseCapacities: Record<string, number> = {};
  private bonusCapacities: Record<string, number> = {};

  setBaseCapacity(type: string, amount: number): void {
    this.baseCapacities[type] = amount;
  }

  setBonusCapacity(type: string, amount: number): void {
    this.bonusCapacities[type] = amount;
  }

  getCapacity(type: string): number {
    const base = this.baseCapacities[type] ?? 0;
    const bonus = this.bonusCapacities[type] ?? 0;
    return base + bonus;
  }
  getBaseCapacity(type: string): number {
  return this.baseCapacities[type] ?? 0;
}

  private amounts: Record<string, number> = {};
  getAll(): Record<string, number> {
  return { ...this.amounts };
  }
  add(type: string, amount: number): void {
    const current = this.get(type);
    const cap = this.getCapacity(type);
    this.amounts[type] = Math.min(current + amount, cap);
    
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
clampToCapacity(): void {
  for (const type of Object.keys(this.amounts)) {
    const cap = this.getCapacity(type);
    if (this.amounts[type] > cap) {
      this.amounts[type] = cap;
    }
  }
}
resetBonusCapacities(): void {
  this.bonusCapacities = {};
}
}