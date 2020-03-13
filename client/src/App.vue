<template>
  <div id="app">
    <Navbar />

    <router-view></router-view>

    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default {
  name: 'app',
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style scoped>
#app {
  overflow-x: hidden;
}
</style>
