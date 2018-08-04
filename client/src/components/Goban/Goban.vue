<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="goban" :viewBox="viewBox">
    <defs>
      <radialGradient id="whiteStone" fx="0.75" fy="0.75">
        <stop offset="0%" stop-color="#ffffff"></stop>
        <stop offset="100%" stop-color="#a0a0a0" stop-opacity="1"></stop>
      </radialGradient>
      <radialGradient id="blackStone" fx="0.75" fy="0.75">
        <stop offset="0%" stop-color="#a0a0a0"></stop>
        <stop offset="100%" stop-color="#000000" stop-opacity="1"></stop>
      </radialGradient>
    </defs>

    <g class="goban-coordinates" v-if="showCoordinates">
      <text class="goban-coordinate"
            v-for="coordinate in coordinates"
            :key="coordinate.id"
            v-bind="coordinate.attributes">
        {{ coordinate.label }}
      </text>
    </g>

    <g class="goban-board" :transform="coordinatesTransform">
      <rect class="goban-board-background" x="0" y="0" :width="boardWidth" :height="boardHeight"/>
      <g class="goban-board-lines" :transform="boardContentsTransform">
        <line class="goban-board-line"
              v-for="line in lines"
              :key="line.id"
              v-bind="line.attributes"/>
        <circle class="goban-board-star"
                v-for="star in stars"
                :key="star.id"
                v-bind="star.attributes"
        />
      </g>

      <g class="goban-entities" :transform="boardContentsTransform">
        <slot/>
      </g>
    </g>
  </svg>
</template>

<script>
  import {
    BOARD_PADDING,
    COORDINATES_MARGIN,
    COORDINATES_ALPHABET,
    STAR_RADIUS,
    STAR_POSITIONS,
    TOTAL_CELL_WIDTH,
    TOTAL_CELL_HEIGHT
  } from './consts';

  import {
    verticalLine,
    horizontalLine,
    text
  } from './helpers';

  export default {
    props: {
      size: {
        type: Number,
        default: 19
      },
      showCoordinates: {
        type: Boolean,
        default: true
      }
    },

    computed: {
      coordinatesShift() {
        return this.showCoordinates ? COORDINATES_MARGIN : 0;
      },

      coordinatesLetters() {
        return this.size > COORDINATES_ALPHABET.length ? null : COORDINATES_ALPHABET.split('').slice(0, this.size);
      },

      coordinatesTransform() {
        return this.showCoordinates ? `translate(${this.coordinatesShift}, ${this.coordinatesShift})` : '';
      },

      boardContentsTransform() {
        return `translate(${BOARD_PADDING}, ${BOARD_PADDING})`;
      },

      boardWidth() {
        return this.size * TOTAL_CELL_WIDTH + 2 * BOARD_PADDING;
      },

      boardHeight() {
        return this.size * TOTAL_CELL_HEIGHT + 2 * BOARD_PADDING;
      },

      viewBox() {
        const coordinatesSize = 2 * this.coordinatesShift;
        const width = this.boardWidth + coordinatesSize;
        const height = this.boardHeight + coordinatesSize;

        return `0 0 ${width} ${height}`;
      },

      lines() {
        const baseVerticalShift = TOTAL_CELL_WIDTH / 2;
        const baseHorizontalShift = TOTAL_CELL_HEIGHT / 2;
        const baseWidth = TOTAL_CELL_WIDTH * (this.size - 0.5);
        const baseHeight = TOTAL_CELL_HEIGHT * (this.size - 0.5);

        const lines = [];

        for (let i = 0; i < this.size; i++) {
          const shiftX = baseVerticalShift + i * TOTAL_CELL_WIDTH;
          const shiftY = baseHorizontalShift + i * TOTAL_CELL_HEIGHT;

          lines.push(
            verticalLine(`v${i}`, baseHorizontalShift, baseHeight, shiftX),
            horizontalLine(`h${i}`, baseVerticalShift, baseWidth, shiftY)
          );
        }

        return lines;
      },

      coordinates() {
        const baseVerticalShift = COORDINATES_MARGIN + TOTAL_CELL_WIDTH / 2 + BOARD_PADDING;
        const baseHorizontalShift = COORDINATES_MARGIN + TOTAL_CELL_HEIGHT / 2 + BOARD_PADDING;
        const FONT_SHIFT = 5;

        const topShift = COORDINATES_MARGIN / 2 + FONT_SHIFT;
        const bottomShift = COORDINATES_MARGIN + topShift + this.boardHeight;

        const leftShift = COORDINATES_MARGIN / 2;
        const rightShift = COORDINATES_MARGIN + leftShift + this.boardWidth;

        const coordinates = [];

        for (let i = 0; i < this.size; i++) {
          const shiftX = baseVerticalShift + i * TOTAL_CELL_WIDTH;
          const shiftY = baseHorizontalShift + i * TOTAL_CELL_HEIGHT + FONT_SHIFT;
          const number = this.size - i;
          const letter = this.coordinatesLetters ? this.coordinatesLetters[i] : (i + 1);

          coordinates.push(
            // letters on top
            text(`vt${i}`, letter, shiftX, topShift),

            // letters on the bottom
            text(`vb${i}`, letter, shiftX, bottomShift),

            // numbers on the left
            text(`ht${i}`, number, leftShift, shiftY),

            // numbers on the right
            text(`hb${i}`, number, rightShift, shiftY),
          );
        }

        return coordinates;
      },

      stars() {
        const starsPositions = STAR_POSITIONS[this.size];

        if (!starsPositions) {
          return [];
        }

        const baseVerticalShift = TOTAL_CELL_WIDTH / 2;
        const baseHorizontalShift = TOTAL_CELL_HEIGHT / 2;

        return starsPositions.map(([x, y], i) => ({
          id: i,
          attributes: {
            cx: baseVerticalShift + x * TOTAL_CELL_WIDTH,
            cy: baseHorizontalShift + y * TOTAL_CELL_HEIGHT,
            r: STAR_RADIUS
          }
        }))
      }
    },

    methods: {
      extractXY(event) {
        const { left, top } = this.$el.getBoundingClientRect();
        const { clientX, clientY } = event;
        const pixelRatio = this.$el.getScreenCTM().a;

        const viewBoxX = (clientX - left) / pixelRatio;
        const viewBoxY = (clientY - top) / pixelRatio;
        const boardX = viewBoxX - this.coordinatesShift - BOARD_PADDING;
        const boardY = viewBoxY - this.coordinatesShift - BOARD_PADDING;
        const boardWidth = this.size * TOTAL_CELL_WIDTH;
        const boardHeight = this.size * TOTAL_CELL_HEIGHT;

        if (boardX < 0 || boardY < 0 || boardX > boardWidth || boardY >= boardHeight) {
          return null;
        }

        return {
          x: Math.floor(boardX / TOTAL_CELL_WIDTH),
          y: Math.floor(boardY / TOTAL_CELL_HEIGHT)
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  .goban-board-line {
    stroke: #000000;
    stroke-width: 1px;
    stroke-linecap: round;
  }

  .goban-board-star {
    fill: #000000;
  }

  .goban-board-background {
    fill: #f0d1a3;
  }

  .goban-coordinate {
    text-anchor: middle;
    font-family: Arial, sans-serif;
    font-size: 10px;
    cursor: default;
    user-select: none;

    &::selection {
      background: none;
    }
  }
</style>