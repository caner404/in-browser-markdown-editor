<template>
  <header :class="{ 'move-to-right': showSidebar }">
    <SidebarButton @click="toggle" />
    <img
      class="markdown_logo"
      src="../../assets/logo.svg"
      alt="Markdown logo"
    />
    <hr />
    <DocumentNameInput />
    <div class="action__container">
      <action-button>
        <svg
          class="delete__icon"
          width="18"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
            fill="#7C8187"
          />
        </svg>
      </action-button>

      <action-button mode="save" title="Save Changes">
        <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.91 5.931 10.575.598A.889.889 0 0 0 10.29.41.969.969 0 0 0 9.945.34H2.834A2.667 2.667 0 0 0 .167 3.007v10.666a2.667 2.667 0 0 0 2.667 2.667H13.5a2.667 2.667 0 0 0 2.667-2.667v-7.11a.889.889 0 0 0-.258-.632ZM5.5 2.118h3.556v1.778H5.5V2.118Zm5.334 12.444H5.5v-2.666c0-.491.398-.89.89-.89h3.555c.49 0 .889.399.889.89v2.666Zm3.555-.889c0 .491-.398.89-.889.89h-.889v-2.667a2.667 2.667 0 0 0-2.666-2.667H6.389a2.667 2.667 0 0 0-2.666 2.667v2.666h-.89a.889.889 0 0 1-.888-.889V3.007c0-.491.398-.89.889-.89h.889v2.667c0 .491.398.89.888.89h5.334c.49 0 .889-.399.889-.89V3.371l3.555 3.556v6.746Z"
            fill="#FFF"
          />
        </svg>
      </action-button>
    </div>
  </header>
</template>
<script>
import SidebarButton from "../SidebarButton.vue";
import DocumentNameInput from "../DocumentNameInput.vue";
import ActionButton from "../ActionButton.vue";

export default {
  props: ["toggle", "showSidebar"],
  components: {
    SidebarButton,
    DocumentNameInput,
    ActionButton,
  },
};
</script>
<style scoped>
header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  height: 5vh;
  width: 100%;
  background-color: var(--clr--800);
}

hr {
  width: 1px;
  height: 4rem;
  background-color: var(--clr--600);
}

.move-to-right {
  margin-left: 25rem;
}

.action__container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-left: auto;
  margin-right: 3rem;
}

.delete__icon:hover {
  cursor: pointer;
}
.delete__icon:hover path {
  fill: var(--clr-orange);
}

@media (max-width: 60em) {
  header {
    gap: 1.5rem;
  }
  .markdown_logo,
  hr {
    display: none;
  }
}
@media (max-width: 38em) {
  .action__container {
    gap: 2rem;
    margin-right: 1.5rem;
  }
}
</style>
