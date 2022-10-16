<template>
  <div class="editor" :class="{ 'editor-active': toggleView }">
    <div class="editor-header">
      <h2 class="editor-heading">Markdown</h2>
      <button
        class="editor-preview-toggle"
        @click="$emit('toggleEditor', false)"
      >
        <img
          src="@/assets/icon-show-preview.svg"
          alt="Icon Preview Button Show"
        />
      </button>
    </div>

    <label for="editor-content">Editor</label>
    <textarea
      :value="store.currentMarkdown.markdownContent"
      @input="updateMethod"
      class="editor-content"
      id="editor-content"
      spellcheck="false"
    >
    </textarea>
  </div>
</template>
<script>
import { store } from "@/store.js";
export default {
  props: ["toggleView", "updateMethod"],
  data() {
    return {
      store,
    };
  },
};
</script>
<style scoped>
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
label {
  display: none;
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
  /* not on .editor cause textarea fills whole area*/
  background-color: var(--clr--100);
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
  .editor-header {
    padding: 1.25rem 1rem;
  }
  .editor-active {
    flex-basis: 100%;
  }
  .editor-preview-toggle {
    display: inline-block;
  }
}
</style>
