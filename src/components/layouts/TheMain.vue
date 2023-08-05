<template>
  <main :class="{ 'sidebar-active': showSidebar }">
    <Editor :toggleView="toggleView" :updateMethod="update" @toggle-editor="(isEditor) => (toggleView = isEditor)" />
    <Preview
      :outputMethod="output"
      :switchToPreview="!toggleView"
      @toggle-editor="(isEditor) => (toggleView = isEditor)"
    />
  </main>
</template>
<script>
import { marked } from "marked";
import { debounce } from "lodash-es";
import { store } from "@/store.js";
import Preview from "../Preview.vue";
import Editor from "../Editor.vue";

export default {
  components: {
    Preview,
    Editor,
  },
  props: ["showSidebar"],

  data() {
    return {
      toggleView: true,
      store,
    };
  },
  computed: {
    output() {
      return marked(store.currentMarkdown.text);
    },
  },
  methods: {
    update: debounce(function (e) {
      store.currentMarkdown.text = e.target.value;
    }, 100),
  },
};
</script>
<style>
main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 95vh;
  width: 100%;
  transition: transform 0.4s ease;
}
main.sidebar-active {
  transform: translateX(25rem);
}
</style>
