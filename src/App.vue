<template>
  <div id="container" :class="{ 'theme-active': store.showDarkMode() }">
    <the-header
      :toggle="toggleSidebar"
      :showSidebar="showSidebar"
      :editMarkdown="editMarkdown"
      :toggleModalDeleteDialog="toggleModalDeleteDialog"
    ></the-header>
    <the-sidebar :createMarkdown="createMarkdown" :showSidebar="showSidebar"></the-sidebar>
    <the-main :showSidebar="showSidebar"></the-main>
    <delete-modal
      v-show="isDeleteModalOpen"
      :removeMarkdown="deleteMarkdown"
      :toggleModalDeleteDialog="toggleModalDeleteDialog"
    ></delete-modal>
  </div>
</template>
<script lang="ts">
import TheHeader from "../src/components/layouts/TheHeader.vue";
import TheMain from "../src/components/layouts/TheMain.vue";
import TheSidebar from "../src/components/layouts/TheSidebar.vue";
import DeleteModal from "../src/components/DeleteModal.vue";
import { store } from "./store";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    TheHeader,
    TheMain,
    TheSidebar,
    DeleteModal,
  },
  data() {
    return {
      showSidebar: false,
      isDeleteModalOpen: false,
      store,
    };
  },
  provide() {
    return {
      removeMarkdown: this.deleteMarkdown,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    createMarkdown() {
      this.store.createMarkdown();
    },
    editMarkdown() {
      this.store.editMarkdown();
    },
    deleteMarkdown() {
      this.store.deleteMarkdown();
      this.toggleModalDeleteDialog();
    },
    toggleModalDeleteDialog() {
      this.isDeleteModalOpen = !this.isDeleteModalOpen;
    },
  },
});
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
  --clr-modal-heading: #35393f;
  --clr-modal-background: #fff;
  --clr-modal-overlay: #151619;
}

#container.theme-active {
  --clr--100: #151619;
  --clr--200: #1d1f22;
  --clr--500: #c1c4cb;
  --clr--700: #c1c4cb;
  --clr-preview-headings: #fff;
  --clr-modal-heading: #fff;
  --clr-modal-background: #151619;
  --clr-modal-overlay: #7c8187;
}
</style>
