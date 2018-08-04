<template>
  <circle :cx="centerX"
          :cy="centerY"
          :r="radius"
          :fill="fill"
          :stroke-width="strokeWidth"
          :stroke="stroke" />
</template>

<script>
  import {
    BLACK,
    WHITE,
    STONE_THEMES,
    TOTAL_CELL_HEIGHT,
    TOTAL_CELL_WIDTH
  } from './consts';

  export default {
    props: {
      x: {
        default: 0
      },
      y: {
        default: 0
      },
      color: {
        default: 'black'
      },
      theme: {
        default: 'gradient'
      }
    },

    computed: {
      centerX() {
        return (this.x + 0.5) * TOTAL_CELL_WIDTH;
      },

      centerY() {
        return (this.y + 0.5) * TOTAL_CELL_HEIGHT;
      },

      stoneTheme() {
        const theme = STONE_THEMES[this.theme] || STONE_THEMES.flat;

        return this.color === WHITE ? theme[WHITE] : theme[BLACK];
      },

      radius() {
        return this.stoneTheme.radius;
      },

      fill() {
        return this.stoneTheme.fill;
      },

      strokeWidth() {
        return this.stoneTheme.strokeWidth;
      },

      stroke() {
        return this.stoneTheme.stroke;
      }
    }
  }
</script>