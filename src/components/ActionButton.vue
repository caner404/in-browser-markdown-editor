<template>
  <button :class="mode">
    <slot></slot>
    <span>{{ title }}</span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title", "mode"],
});
</script>
<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.create {
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.8rem;
  color: #fff;
  background-color: var(--clr-orange);
  border-radius: 4px;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  transition: all 0.5s ease-out;
}
.create:hover {
  background-color: var(--clr-orange-hover);
}

.save,
.confirm {
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.8rem;
  color: #fff;
  background-color: var(--clr-orange);
  border-radius: 4px;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  transition: all 0.5s ease-out;
}
.save:hover,
.confirm:hover {
  background-color: var(--clr-orange-hover);
}

@media (max-width: 38em) {
  .save > span {
    display: none;
  }
  .save {
    padding: 1rem;
  }
}
</style>
