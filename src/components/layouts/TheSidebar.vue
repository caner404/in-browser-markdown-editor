<template>
  <aside>
    <transition name="slide">
      <div class="sidebar" v-if="showSidebar">
        <img class="markdown_logo_sidebar" src="../../assets/logo.svg" alt="Markdown logo" />
        <h2>My Documents</h2>
        <action-button @click="createMarkdown" mode="create" title="+ New Document" />
        <DocumentList />
        <DarkModeToggle />
      </div>
    </transition>
  </aside>
</template>
<script lang="ts">
import DocumentList from "../DocumentList.vue";
import ActionButton from "../ActionButton.vue";
import DarkModeToggle from "../DarkModeToggle.vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: ["showSidebar", "createMarkdown"],
  components: {
    DocumentList,
    ActionButton,
    DarkModeToggle,
  },
});
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 25rem;
  height: 100vh;
  overflow-x: hidden;

  background-color: var(--clr--1000);
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 3rem;
  justify-content: flex-start;
  padding: 2.5rem;
}

.markdown_logo_sidebar {
  display: none;
}
h2 {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.6rem;
  letter-spacing: 0.2rem;
  color: var(--clr--500);
  text-transform: uppercase;
}

@media (max-width: 60em) {
  .markdown_logo_sidebar {
    display: inline-block;
  }
}
</style>
