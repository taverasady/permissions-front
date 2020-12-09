<template>
  <div id="app">
  <Header />
    <router-view/>
    <Footer />
  </div>
</template>
<script>
import Header from "./layout/header/header.vue";
import Footer from "./layout/footer/footer.vue";

export default {
  components: { Header, Footer }
}
</script>