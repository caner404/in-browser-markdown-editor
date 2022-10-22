import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import DeleteModal from "./DeleteModal.vue";

test("renders a todo", () => {
  const wrapper = mount(DeleteModal);
  const modal = wrapper.get('[data-test="modal"]');
  expect(modal.html()).toContain("Delete this document?");
});

test("MarkdownTitle is shown correct", () => {
  const wrapper = mount(DeleteModal, {
    data() {
      return {
        store: {
          currentMarkdown: {
            markdownTitle: "test.md",
          },
        },
      };
    },
  });
  const modalHeading = wrapper.get('[data-test="modal-description"]');
  expect(modalHeading.text()).toContain("test.md");
});
