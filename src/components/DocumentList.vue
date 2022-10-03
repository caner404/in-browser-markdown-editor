<template>
  <ul>
    <document-list-item
      v-for="doc in documents"
      :id="doc.id"
      :date="doc.date"
      :name="doc.name"
    ></document-list-item>
  </ul>
</template>
<script>
import DocumentListItem from "./DocumentListItem.vue";
export default {
  components: {
    DocumentListItem,
  },
  inject: ["documents"],
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
