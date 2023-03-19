<template>
  <Home />
</template>

<script lang="ts">
import Vue from 'vue'
import Home from '@/components/home/Home.vue';
export default Vue.extend({
  name: 'HomeView',

  components: {
    Home
  },
})
</script>
