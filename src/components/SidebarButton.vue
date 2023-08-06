<template>
  <button @click="isButtonClicked = !isButtonClicked">
    <img v-if="!isButtonClicked" src="../assets/icon-menu.svg" alt="Menu Button" />
    <img v-else="isButtonClicked" src="../assets/icon-close.svg" alt="Menu Button Clicked" />
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      isButtonClicked: false,
    };
  },
});
</script>
<style scoped>
button {
  border: none;
  width: 7.2rem;
  height: 100%;
  background-color: var(--clr--sidebarbutton);
  cursor: pointer;
}

button:hover {
  background-color: var(--clr-orange);
}
@media (max-width: 56em) {
  button {
    width: 6.2rem;
  }
}
@media (max-width: 18em) {
  button {
    width: 4rem;
  }
}
</style>
