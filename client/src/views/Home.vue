<template>
  <div class="home">
    <ul>
      <li v-for="game in $store.state.games" :key="game.id">
        <router-link :to="{ name: 'game', params: { id: game.id }}">{{ game.name }}</router-link>
      </li>
    </ul>
  </div>
</template>
