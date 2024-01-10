export class Block {
  public bottomLeft: number[];
  public bottomRight: number[];
  public topLeft: number[];
  public topRight: number[];
  constructor(
    public x: number,
    public y: number,
    public widthBlock: number,
    public heightBlock: number
  ) {
    this.bottomLeft = [x, y];
    this.bottomRight = [x + widthBlock, y];
    this.topLeft = [x, y + heightBlock];
    this.topRight = [x + widthBlock, y + heightBlock];
  }
}
