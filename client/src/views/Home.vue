<template>
  <div class="home">
    <ul>
      <li v-for="game in $store.state.games" :key="game.id">
        <router-link :to="{ name: 'game', params: { id: game.id }}">{{ game.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import api from '@/api';

  export default {
    created() {
      this.fetchGames();
    },

    methods: {
      fetchGames() {
        api.fetchGames()
          .then((response) => this.$store.commit('updateGames', response));
      }
    }
  }
</script>
