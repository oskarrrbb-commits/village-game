export type TileType = 'grass'|'border';

export class Tile {
  constructor(
    public type: TileType,
    public gridX: number,
    public gridY: number
  ) {}
}

export class GridMap {
  tiles: Tile[][] = [];

  constructor(public width: number, public height: number) {
    for (let y = 0; y < height; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < width; x++) {
        if(x==0||y==0||x==width-1||y==height-1){
            row.push(new Tile('border', x, y));
        }else{

        row.push(new Tile('grass', x, y));
        }
      }
      this.tiles.push(row);
    }
  }

  getTile(x: number, y: number): Tile | undefined {
    return this.tiles[y]?.[x];
  }
}