export type ResourceType = 'wheat'|'coal';

export class Resources {
  private amounts: Record<string, number> = {};

  add(type: string, amount: number): void {
    this.amounts[type] = (this.amounts[type] ?? 0) + amount;
  }

  get(type: string): number {
    return this.amounts[type] ?? 0;
  }
}