<template>
  <ul>
    <document-list-item
      v-for="markdown in store.getMarkdownList()"
      :id="markdown.id"
      :markdownTitle="markdown.markdownTitle"
      :markdownDate="markdown.markdownDate"
      @click="switchCurrentMarkdown(markdown.id)"
    ></document-list-item>
  </ul>
</template>
<script>
import DocumentListItem from "./DocumentListItem.vue";
import { store } from "@/store.js";
export default {
  data() {
    return {
      store,
    };
  },
  components: {
    DocumentListItem,
  },
  methods: {
    switchCurrentMarkdown(markdownId) {
      const nextMarkdownItem = store.getMarkdownItem(markdownId);
      store.setCurrentMarkdown(nextMarkdownItem);
    },
  },
};
</script>
<style scoped>
ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
}
</style>
