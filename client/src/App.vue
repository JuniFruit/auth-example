<template>
  <Layout />
</template>

<script lang="ts">
import Vue from 'vue';
import Layout from './components/layout/Layout.vue';
export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {
    localStorage.getItem('access_token') !== undefined ? this.$store.dispatch('checkAuth') : null;
  },
  errorCaptured(err, vm, ...rest) {
    // console.log(err.name)
    // this.$store.commit('setErrMsg', { errMessage: err.name === 'AxiosError' ? (err as AxiosError).message : null })
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Product browser';
      }
    },
  },
  components: {
    Layout
  }
});
</script>

<style lang="scss">
@import './styles/main.scss';
</style>
