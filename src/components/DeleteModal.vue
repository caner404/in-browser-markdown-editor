<template>
  <div class="modal-container" data-test="modal-container">
    <div class="modal" data-test="modal">
      <h3 class="modal-heading" data-test="modal-heading">
        Delete this document?
      </h3>
      <p class="modal-description" data-test="modal-description">
        Are you sure you want to delete the '{{
          this.store.currentMarkdown.markdownTitle
        }}'' document and its contents? This action cannot be reversed
      </p>
      <action-button
        @click="removeMarkdown"
        mode="confirm"
        title="Confirm & Delete"
        data-test="modal-button"
      >
      </action-button>
    </div>
    <div
      class="overlay"
      @click="toggleModalDeleteDialog"
      data-test="modal-overlay"
    ></div>
  </div>
</template>
<script>
import ActionButton from "./ActionButton.vue";
import { store } from "@/store.js";
export default {
  props: ["removeMarkdown", "toggleModalDeleteDialog"],
  data() {
    return {
      store,
    };
  },
  components: {
    ActionButton,
  },
};
</script>
<style scoped>
.modal-container {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--clr--100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem;
  gap: 2rem;
  z-index: 1;
  border-radius: 0.7rem;
  font-family: "Roboto Slab";
  max-width: 40rem;
}
.modal-heading {
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.6rem;
  color: var(--clr-modal-heading);
}
.modal-description {
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: var(--clr--500);
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--clr-modal-overlay);
  opacity: 0.5;
  mix-blend-mode: normal;
}

@media (max-width: 38em) {
  .modal {
    width: 90vw;
  }
}
</style>
