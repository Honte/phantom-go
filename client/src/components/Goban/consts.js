// static strings
export const BLACK = 'black';
export const WHITE = 'white';

// size of single position on the goban in svg scale
export const CELL_HEIGHT = 20;
export const CELL_WIDTH = 20;

// space between positions
export const CELL_MARGIN = 2;

// padding for board
export const BOARD_PADDING = 5;

export const TOTAL_CELL_WIDTH = CELL_WIDTH + CELL_MARGIN;
export const TOTAL_CELL_HEIGHT = CELL_HEIGHT + CELL_MARGIN;

// stone dimensions
export const STONE_SIZE = Math.min(CELL_HEIGHT, CELL_WIDTH);
export const STONE_RADIUS = STONE_SIZE / 2;

// width of border line of white stones
export const STONE_STROKE_WIDTH = 2;

export const COORDINATES_MARGIN = STONE_SIZE;
export const COORDINATES_ALPHABET = 'ABCDEFGHJKLMNOPQRSTUWXYZ';

// radius of star points (e.g. hoshi) on the goban
export const STAR_RADIUS = 2;

export const STAR_POSITIONS = {
  9: [
    [2,2], [6,2],
       [4,4],
    [2,6], [6,6]
  ],
  13: [
    [3,3], [9,3],
       [6,6],
    [3,9], [9,9]
  ],
  19: [
    [3,3],  [9,3],  [15,3],
    [3,9],  [9,9],  [15,9],
    [3,15], [9,15], [15,15],
  ]
};

export const FlatStones = {
  [BLACK]: {
    radius: STONE_RADIUS,
    fill: '#000000'
  },
  [WHITE]: {
    radius: (STONE_SIZE - STONE_STROKE_WIDTH) / 2,
    fill: '#ffffff',
    strokeWidth: STONE_STROKE_WIDTH,
    stroke: '#000000'
  }
};

export const GradientStones = {
  [BLACK]: {
    radius: STONE_RADIUS,
    fill: 'url(#blackStone)' // reuse gradients defined once in Goban.vue
  },
  [WHITE]: {
    radius: STONE_RADIUS,
    fill: 'url(#whiteStone)'
  }
};

export const STONE_THEMES = {
  flat: FlatStones,
  gradient: GradientStones
};
