<template>
  <button @click="isButtonClicked = !isButtonClicked">
    <img
      v-if="!isButtonClicked"
      src="../assets/icon-menu.svg"
      alt="Menu Button"
    />
    <img
      v-else="isButtonClicked"
      src="../assets/icon-close.svg"
      alt="Menu Button Clicked"
    />
  </button>
</template>
<script>
export default {
  data() {
    return {
      isButtonClicked: false,
    };
  },
};
</script>
<style scoped>
button {
  border: none;
  width: 7.2rem;
  height: 7.2rem;
  background-color: var(--clr--700);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

button:hover {
  background-color: var(--clr-orange);
}
@media (max-width: 38em) {
  button {
    width: 5.6rem;
    height: 5.6rem;
  }
}
</style>
