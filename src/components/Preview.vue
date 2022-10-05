<template>
  <div
    class="preview"
    :class="{ 'preview-active': isPreview || switchToPreview }"
  >
    <div class="preview-header">
      <h2 class="preview-heading">Preview</h2>
      <button
        v-if="switchToPreview"
        class="preview-icon"
        @click="$emit('toggleEditor', true)"
      >
        <img src="../assets/icon-hide-preview.svg" alt="Test2" />
      </button>
      <button v-else class="preview-icon" @click="isPreview = !isPreview">
        <img
          v-if="!isPreview"
          src="../assets/icon-show-preview.svg"
          alt="Icon Preview Button Show"
        />
        <img
          v-else-if="isPreview"
          src="../assets/icon-hide-preview.svg"
          alt="Icon Preview Button Hide"
        />
      </button>
    </div>

    <div
      class="preview-content"
      v-html="outputMethod"
      :class="{ 'preview-content-active': isPreview }"
    ></div>
  </div>
</template>
<script>
export default {
  props: ["outputMethod", "switchToPreview"],
  data() {
    return {
      isPreview: false,
    };
  },
};
</script>
<style>
.preview {
  display: flex;
  flex-direction: column;
  height: inherit;
  flex: 1;
  overflow-y: scroll;
}
.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--clr--500);
  background-color: var(--clr--200);
  padding: 2rem 1.5rem;
}
.preview-heading {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
}

.preview-icon {
  background: transparent;
  border: none;
  height: 1.5rem;
}

.preview-active {
  flex-basis: 100%;
}
.preview-content-active {
  max-width: 50%;
  align-self: center;
}

.preview-content {
  height: 100%;
  font-family: "Roboto Slab";
  color: var(--clr--700);
  padding: 1rem;
}

.preview-content > * {
  margin-bottom: 2.5rem;
}

.preview-content h1,
.preview-content h2,
.preview-content h3,
.preview-content h4,
.preview-content h5,
.preview-content h6 {
  font-weight: 700;
  color: var(--clr--700);
}
.preview-content h1 {
  font-size: 3.2rem;
  line-height: 4.2rem;
}

.preview-content h2 {
  font-weight: 300;
  font-size: 2.8rem;
  line-height: 3.7rem;
}

.preview-content h3 {
  font-size: 2.4rem;
  line-height: 3.2rem;
}

.preview-content h4 {
  font-size: 2rem;
  line-height: 2.6rem;
}

.preview-content h5 {
  font-size: 1.6rem;
  line-height: 2.1rem;
}

.preview-content h6 {
  font-size: 1.4rem;
  line-height: 1.8rem;
  color: var(--clr-orange);
}

.preview-content a:link,
.preview-content a:visited {
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: var(--clr--700);
  text-decoration: underline solid var(--clr--700);
}

.preview-content p {
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: var(--clr--500);
}

.preview-content ol,
ul {
  padding-left: 2.5rem;
}

.preview-content ul {
  list-style: none;
}

.preview-content ul li::before {
  content: "\2022";
  color: var(--clr-orange);
  font-weight: bold;
  display: inline-block;
  width: 2rem;
  margin-left: -1.5rem;
}

.preview-content li {
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.4rem;
  padding-bottom: 0.5rem;
  color: var(--clr--500);
}

.preview-content blockquote {
  background-color: var(--clr--200);
  border-left: 5px solid var(--clr-orange);
  border-radius: 4px 0px 0px 4px;
  padding: 2.5rem;
}

.preview-content blockquote p {
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: var(--clr--700);
}

.preview-content pre {
  background-color: var(--clr--200);
  padding: 3rem;
}
.preview-content code {
  font-family: "Roboto Mono";
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: var(--clr--700);
}

@media screen and (max-width: 60em) {
  .preview-content {
    padding: 3rem;
  }
  .preview-content-active {
    max-width: 100%;
    align-self: center;
  }
}
</style>
