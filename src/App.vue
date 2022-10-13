<template>
  <div id="container" :class="{ 'theme-active': store.showDarkMode() }">
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
  </div>
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
#container {
  position: relative;
  font-family: "Roboto", sans-serif;
  font-size: 1.6rem;
  width: 100vw;
  height: 100vh;
  transition: 1s;

  --clr--100: #ffffff;
  --clr--200: #f5f5f5;
  --clr--300: #e4e4e4;
  --clr--400: #c1c4cb;
  --clr--500: #7c8187;
  --clr--600: #5a6069;
  --clr--700: #35393f;
  --clr--800: #2b2d31;
  --clr--900: #1d1f22;
  --clr--1000: #151619;
  --clr-orange: #e46643;
  --clr-orange-hover: #f39765;

  --clr-document-name-white: #fff;
  --clr--sidebarbutton: #35393f;
  --clr-preview-headings: #35393f;
}

#container.theme-active {
  --clr--100: #151619;
  --clr--200: #1d1f22;
  --clr--500: #c1c4cb;
  --clr--700: #c1c4cb;
  --clr-preview-headings: #fff;
}
</style>
