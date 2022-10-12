<template>
  <the-header
    :toggle="toggleSidebar"
    :showSidebar="showSidebar"
    :updateMarkdown="updateMarkdown"
    :deleteMarkdown="deleteMarkdown"
  ></the-header>
  <the-sidebar
    :createMarkdown="createMarkdown"
    :showSidebar="showSidebar"
  ></the-sidebar>
  <the-main :showSidebar="showSidebar"></the-main>
</template>
<script>
import TheHeader from "./components/layouts/TheHeader.vue";
import TheMain from "./components/layouts/TheMain.vue";
import TheSidebar from "./components/layouts/TheSidebar.vue";
import { store } from "@/store.js";

export default {
  components: {
    TheHeader,
    TheMain,
    TheSidebar,
  },
  data() {
    return {
      showSidebar: false,
      store,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    createMarkdown() {
      const newMarkdown = {
        id: "",
        markdownTitle: "",
        markdownContent: "",
        markdownDate: "",
      };
      store.setCurrentMarkdown(newMarkdown);
    },
    updateMarkdown() {
      const currentMarkdown = this.store.getCurrentMarkdown();
      const localStorageItem = JSON.parse(
        window.localStorage.getItem(currentMarkdown.id)
      );
      if (localStorageItem != null) {
        localStorageItem.markdownTitle = currentMarkdown.markdownTitle;
        localStorageItem.markdownContent = currentMarkdown.markdownContent;
        localStorageItem.markdownDate = store.getDateFormat();
        window.localStorage.setItem(
          localStorageItem.id,
          JSON.stringify(localStorageItem)
        );
        //remove current markdown in list
        const removeIndex = this.store
          .getMarkdownList()
          .findIndex((markdown) => markdown.id === store.currentMarkdown.id);
        this.store.getMarkdownList().splice(removeIndex, 1);
      } else {
        currentMarkdown.markdownDate = store.getDateFormat();
        currentMarkdown.id = new Date().toISOString();
        window.localStorage.setItem(
          currentMarkdown.id,
          JSON.stringify(currentMarkdown)
        );
      }
      this.store.getMarkdownList().unshift(currentMarkdown);
    },
    deleteMarkdown() {
      window.localStorage.removeItem(store.currentMarkdown.id);
      const removeIndex = this.store
        .getMarkdownList()
        .findIndex((markdown) => markdown.id === store.currentMarkdown.id);
      this.store.getMarkdownList().splice(removeIndex, 1);
      store.setCurrentMarkdown({
        id: "",
        markdownTitle: "",
        markdownContent: "",
        markdownDate: Date,
      });
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
