<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>
<script>
import Navbar from './layout/Navbar/Navbar.vue';

export default {
  components: { Navbar }
}
</script>