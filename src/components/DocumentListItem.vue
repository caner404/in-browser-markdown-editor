<template>
  <li class="document-item">
    <svg
      class="document-item__icon"
      width="14"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.107 3.393c.167.167.31.393.429.678.119.286.178.548.178.786v10.286c0 .238-.083.44-.25.607a.827.827 0 0 1-.607.25h-12a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V.857C0 .62.083.417.25.25A.827.827 0 0 1 .857 0h8c.238 0 .5.06.786.179.286.119.512.261.678.428l2.786 2.786ZM9.143 1.214v3.357H12.5c-.06-.172-.125-.294-.196-.366L9.509 1.411c-.072-.072-.194-.137-.366-.197Zm3.428 13.643V5.714H8.857a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V1.143H1.143v13.714H12.57Z"
        fill="#FFF"
      />
    </svg>
    <div class="document-item__info">
      <p class="document-item__date">{{ markdownDate }}</p>
      <p class="document-item__name">{{ markdownTitle }}</p>
    </div>
  </li>
</template>
<script>
export default {
  props: ["id", "markdownTitle", "markdownDate"],
};
</script>
<style scoped>
.document-item {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.document-item__info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}
.document-item__date {
  font-weight: 300;
  font-size: 1.3rem;
  line-height: 1.5rem;
  color: var(--clr--500);
}
.document-item__name {
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.8rem;
  color: var(--clr-document-name-white);
}
.document-item__name:hover {
  cursor: pointer;
  color: var(--clr-orange);
}
</style>
