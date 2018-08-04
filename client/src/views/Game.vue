<template>
  <div>
    <h2>Game {{ game.name }}</h2>

    <Goban ref="goban"
           size="19"
           width="600"
           height="600"
           @mousemove.native="onBoardHover($event)"
           @click.native="onBoardClick($event)"
           @contextmenu.native="onBoardRightClick($event)">
      <Stone v-for="stone in stones"
             :key="`${stone.x},${stone.y}`"
             :x="stone.x"
             :y="stone.y"
             :color="stone.color"
      />
      <Stone v-if="hoverStone.visible"
             :x="hoverStone.x"
             :y="hoverStone.y"
             :color="hoverStone.color"
             opacity="0.5"
      />
    </Goban>
  </div>
</template>

<script>
  import Goban from '@/components/Goban/Goban.vue';
  import Stone from '@/components/Goban/Stone.vue';

  export default {
    components: {
      Goban,
      Stone
    },

    data() {
      return {
        hoverStone: {
          visible: false,
          x: 0,
          y: 0,
          color: 'black'
        },
        stones: [
          {
            x: 0,
            y: 0,
            color: 'black'
          },
          {
            x: 3,
            y: 2,
            color: 'white'
          },
          {
            x: 2,
            y: 12,
            color: 'black'
          },
          {
            x: 1,
            y: 2,
            color: 'black'
          },
          {
            x: 4,
            y: 5,
            color: 'white'
          },
        ]
      }
    },

    computed: {
      game() {
        return this.$store.state.games.find((gameItem) => String(gameItem.id) === String(this.$route.params.id));
      }
    },

    methods: {
      findStoneIndex(x, y) {
        return this.stones.findIndex((stone) => stone.x === x && stone.y === y);
      },

      toggleStone(x, y, color = 'black') {
        const existingStoneIndex = this.findStoneIndex(x, y);

        if (existingStoneIndex > 0) {
          if (this.stones[existingStoneIndex].color === color) {
            // remove old stone
            this.stones.splice(existingStoneIndex, 1);

            // show hover stone in its place
            this.hoverStone.visible = true;
            this.hoverStone.x = x;
            this.hoverStone.y = y;
          }

          return;
        }

        // hide hover stone
        this.hoverStone.visible = false;

        // add stone
        this.stones.push({
          color,
          x,
          y
        });
      },

      onBoardHover(event) {
        const position = this.$refs.goban.extractXY(event);

        if (!position || this.findStoneIndex(position.x, position.y) >= 0) {
          this.hoverStone.visible = false;

          return;
        }

        this.hoverStone.visible = true;
        this.hoverStone.x = position.x;
        this.hoverStone.y = position.y;
        this.hoverStone.color = event.ctrlKey ? 'white' : 'black';
      },

      onBoardClick(event) {
        const position = this.$refs.goban.extractXY(event);

        if (!position) {
          return;
        }

        this.toggleStone(position.x, position.y, event.ctrlKey ? 'white' : 'black');
      },

      onBoardRightClick(event) {
        event.preventDefault();

        const position = this.$refs.goban.extractXY(event);

        if (!position) {
          return;
        }

        this.toggleStone(position.x, position.y, 'white');
      }
    }
  }
</script>