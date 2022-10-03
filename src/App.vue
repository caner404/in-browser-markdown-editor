<template>
  <the-header :toggle="toggleSidebar" :showSidebar="showSidebar"></the-header>
  <the-sidebar v-if="showSidebar" :showSidebar="showSidebar"></the-sidebar>
  <the-main :showSidebar="showSidebar"></the-main>
</template>
<script>
import TheHeader from "./components/layouts/TheHeader.vue";
import TheMain from "./components/layouts/TheMain.vue";
import TheSidebar from "./components/layouts/TheSidebar.vue";

export default {
  components: {
    TheHeader,
    TheMain,
    TheSidebar,
  },
  data() {
    return {
      showSidebar: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
};
</script>
<style>
#app {
  position: relative;
  font-family: "Roboto", sans-serif;
  font-size: 1.6rem;
  width: 100vw;
  height: 100vh;
}
</style>
