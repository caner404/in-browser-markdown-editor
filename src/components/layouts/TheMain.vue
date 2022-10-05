<template>
  <main :class="{ 'margin-left': showSidebar }">
    <div class="editor">
      <h2 class="editor-header">Markdown</h2>
      <textarea
        :value="inputText"
        @input="update"
        class="editor-content"
        spellcheck="false"
      >
      </textarea>
    </div>

    <Preview :outputMethod="output" />
  </main>
</template>
<script>
import { marked } from "marked";
import { debounce } from "lodash-es";
import Preview from "../Preview.vue";

export default {
  components: {
    Preview,
  },
  props: ["showSidebar"],
  data() {
    return {
      inputText: "",
    };
  },
  computed: {
    output() {
      return marked(this.inputText);
    },
  },
  methods: {
    update: debounce(function (e) {
      this.inputText = e.target.value;
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
}
.editor-header {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.6rem;
  letter-spacing: 0.2rem;
  color: var(--clr--500);
  background-color: var(--clr--200);
  padding: 2rem 1rem;
  text-transform: uppercase;
}

.editor {
  display: flex;
  flex-direction: column;
  height: inherit;
  flex: 1;
  overflow: hidden;
}
.editor {
  border-right: 1px solid #e4e4e4;
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

@media screen and (max-width: 60em) {
  .editor-content {
    padding: 1.5rem;
  }
}
</style>
