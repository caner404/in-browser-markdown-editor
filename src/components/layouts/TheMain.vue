<template>
  <main :class="{ 'sidebar-active': showSidebar }">
    <div class="editor" :class="{ 'editor-active': toggleView }">
      <div class="editor-header">
        <h2 class="editor-heading">Markdown</h2>
        <button class="editor-preview-toggle" @click="toggleView = !toggleView">
          <img
            src="../../assets/icon-show-preview.svg"
            alt="Icon Preview Button Show"
          />
        </button>
      </div>

      <textarea
        :value="store.currentMarkdown.markdownContent"
        @input="update"
        class="editor-content"
        spellcheck="false"
      >
      </textarea>
    </div>

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
import Preview from "../Preview.vue";
import { store } from "@/store.js";

export default {
  components: {
    Preview,
  },
  props: ["showSidebar"],

  data() {
    return {
      toggleView: true,
      selectedView: "preview",
      store,
    };
  },
  computed: {
    output() {
      return marked(store.currentMarkdown.markdownContent);
    },
  },
  methods: {
    update: debounce(function (e) {
      store.currentMarkdown.markdownContent = e.target.value;
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
.editor-heading {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.6rem;
  letter-spacing: 0.2rem;

  text-transform: uppercase;
}

.editor {
  display: flex;
  flex-direction: column;
  height: inherit;
  flex: 1;
  overflow: hidden;
  border-right: 1px solid #e4e4e4;
}
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--clr--500);
  background-color: var(--clr--200);
  padding: 2rem 1rem;
}
.margin-left {
  margin-left: 25rem;
}

.editor-content {
  outline: none;
  border: none;
  height: 100%;
  resize: none;
  padding: 1rem;
  font-family: "Roboto Mono";
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: var(--clr--700);
}

.editor-preview-toggle {
  display: none;
  background: transparent;
  border: none;
  height: 1.5rem;
}

@media (max-width: 60em) {
  .editor-content {
    padding: 1.5rem;
  }
}
@media (max-width: 38em) {
  .editor {
    flex-basis: 0%;
  }
  .editor-active {
    flex-basis: 100%;
  }
  .editor-preview-toggle {
    display: inline-block;
  }
}
</style>
