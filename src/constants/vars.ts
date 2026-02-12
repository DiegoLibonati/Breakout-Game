import type { Coords, Rows, Sizes } from "@/types/app";

import { Block } from "@/core/block";

// Board Config
export const widthBoard = 600;
export const heightBoard = 300;

// Bloques Config
export const rows: Rows = { y1: 279, y2: 259, y3: 239 };
export const widthBlock = 100;
export const heightBlock = 20;

export const userPosition: Coords = { x: 250, y: 0 };

export const ballDiameter = 20;
export const ballPosition: Coords = { x: 270, y: 40 };
export const ballDirection: Coords = { x: 2, y: 1 };

export const blockSizes: Sizes = { width: widthBlock, height: heightBlock };

export const initialScore = 0;
export const initialBlocks: Block[] = [
  new Block({ x: 0, y: rows.y1 }, blockSizes),
  new Block({ x: 100, y: rows.y1 }, blockSizes),
  new Block({ x: 200, y: rows.y1 }, blockSizes),
  new Block({ x: 300, y: rows.y1 }, blockSizes),
  new Block({ x: 400, y: rows.y1 }, blockSizes),
  new Block({ x: 500, y: rows.y1 }, blockSizes),

  new Block({ x: 0, y: rows.y2 }, blockSizes),
  new Block({ x: 100, y: rows.y2 }, blockSizes),
  new Block({ x: 200, y: rows.y2 }, blockSizes),
  new Block({ x: 300, y: rows.y2 }, blockSizes),
  new Block({ x: 400, y: rows.y2 }, blockSizes),
  new Block({ x: 500, y: rows.y2 }, blockSizes),

  new Block({ x: 0, y: rows.y3 }, blockSizes),
  new Block({ x: 100, y: rows.y3 }, blockSizes),
  new Block({ x: 200, y: rows.y3 }, blockSizes),
  new Block({ x: 300, y: rows.y3 }, blockSizes),
  new Block({ x: 400, y: rows.y3 }, blockSizes),
  new Block({ x: 500, y: rows.y3 }, blockSizes),
];
