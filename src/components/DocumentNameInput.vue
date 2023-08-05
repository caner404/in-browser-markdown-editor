<template>
  <div class="document">
    <img class="document_icon" src="../assets/icon-document.svg" alt="document file icon" />
    <div class="document__content">
      <label class="document__name" for="document_input">Document Name</label>
      <input id="document_input" class="document__input" type="text" v-model="store.currentMarkdown.title" />
    </div>
  </div>
</template>
<script>
import { store } from "@/store.js";
export default {
  data() {
    return {
      store,
    };
  },
};
</script>
<style scoped>
.document {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.document__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.document__name {
  font-weight: 300;
  font-size: 1.3rem;
  line-height: 1.5rem;
  color: var(--clr--500);
}

.document__input {
  outline: none;
  border: transparent;
  caret-color: var(--clr-orange);
  color: var(--clr-document-name-white);
  background-color: transparent;
  font-family: "Roboto";
  font-style: normal;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.8rem;
  width: 20rem;
}

.document__input:focus {
  border-bottom: 2px solid white;
}

@media (max-width: 38em) {
  .document {
    gap: 1.5rem;
  }
  .document__name {
    display: none;
  }
  .document__input {
    width: 100%;
  }
}
</style>
