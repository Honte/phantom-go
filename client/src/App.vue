<template>
  <div id="app">
    <Loader v-if="loading"/>

    <h1>Phantom Go</h1>

    <router-view/>
  </div>
</template>

<script>
  import Loader from '@/components/Loader';
  import api from '@/api';

  export default {
    components: {
      Loader
    },

    data() {
      return {
        loading: api.isPending()
      };
    },

    created() {
      api.connection
        .on('loader:show', () => (this.loading = true))
        .on('loader:hide', () => (this.loading = false));
    }
  }
</script>

<style lang="scss">
  #app {
    width: 80vw;
    margin: 0 auto;
  }
</style>