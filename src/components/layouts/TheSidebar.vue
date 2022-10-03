<template>
  <aside :class="{ expand: showSidebar }">
    <img
      class="markdown_logo_sidebar"
      src="../../assets/logo.svg"
      alt="Markdown logo"
    />
    <h2>MY DOCUMENTS</h2>
    <action-button mode="create" title="+ New Document" />
    <DocumentList />
  </aside>
</template>
<script>
import DocumentList from "../DocumentList.vue";
import ActionButton from "../ActionButton.vue";

export default {
  props: ["showSidebar"],
  components: {
    DocumentList,
    ActionButton,
  },
  data() {
    return {
      storedList: [
        {
          id: 1,
          date: "5 May 2022",
          name: "untitled-document2.md",
        },
        {
          id: 2,
          date: "25 May 2022",
          name: "utest-1231231.md",
        },
        {
          id: 3,
          date: "15 May 2022",
          name: "suck-ma-balls-hehe.md",
        },
      ],
    };
  },
  provide() {
    return {
      documents: this.storedList,
    };
  },
};
</script>
<style scoped>
aside {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 0rem;
  height: 100%;
  background-color: var(--clr--1000);
  overflow-x: hidden;

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
}
.expand {
  width: 25rem;
}

@media (max-width: 60em) {
  .markdown_logo_sidebar {
    display: inline-block;
  }
}
</style>
