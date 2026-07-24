export type ResourceType = 'wheat';

export class Resources {
  private amounts: Record<ResourceType, number> = {
    wheat: 0,
  };

  add(type: ResourceType, amount: number): void {
    this.amounts[type] += amount;
  }

  get(type: ResourceType): number {
    return this.amounts[type];
  }
}