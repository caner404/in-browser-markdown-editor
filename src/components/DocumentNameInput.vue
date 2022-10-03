<template>
  <div class="document">
    <img class="document_icon" src="../assets/icon-document.svg" />
    <div class="document__content">
      <p class="document__name">Document Name</p>
      <input class="document__input" type="text" />
    </div>
  </div>
</template>
<script></script>
<style scoped>
.document {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.document__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.document__name {
  font-weight: 300;
  font-size: 1.3rem;
  line-height: 1.5rem;
  color: var(--clr--500);
}

.document__input {
  outline: none;
  border: transparent;
  caret-color: var(--clr-orange);
  background-color: transparent;
  color: var(--clr--100);
  font-family: "Roboto";
  font-style: normal;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.8rem;
  width: 20rem;
}

.document__input:focus {
  border-bottom: 2px solid white;
}
</style>
