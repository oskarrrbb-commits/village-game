import Phaser from 'phaser';

export interface AssetEntry {
  key: string;
  path: string;
}

export const TILE_ASSETS: AssetEntry[] = [
  { key: 'grass', path: 'assets/grass.png' },
  { key: 'border', path: 'assets/border.png' },
];

export const BUILDING_ASSETS: AssetEntry[] = [
  { key: 'house', path: 'assets/house.png' },
  { key: 'farm', path: 'assets/farm.png' },
];

export function loadAllAssets(scene: Phaser.Scene): void {
  const all = [...TILE_ASSETS, ...BUILDING_ASSETS];
  for (const asset of all) {
    scene.load.image(asset.key, asset.path);
  }
}