import { beforeEach, describe, expect, test } from "vitest";
import { store } from "./store";

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

beforeEach(() => {
  const markdownList = [
    {
      id: 1,
      markdownTitle: "test1.md",
      markdownContent: "testContent",
      markdownDate: Date,
    },
    {
      id: 2,
      markdownTitle: "test2.md",
      markdownContent: "testContent3",
      markdownDate: Date,
    },
    {
      id: 3,
      markdownTitle: "test3.md",
      markdownContent:
        "This is lorem ipsum content which is not very informative",
      markdownDate: Date,
    },
  ];
  store.setMarkdownList(markdownList);
  window.localStorage.clear();
});

test("getMarkdownItem", () => {
  let expectedMarkDownItem = {
    id: 3,
    markdownTitle: "test3.md",
    markdownContent:
      "This is lorem ipsum content which is not very informative",
    markdownDate: Date,
  };
  expect(store.getMarkdownItem(expectedMarkDownItem.id)).toEqual(
    expectedMarkDownItem
  );
});

test("remove MarkdownItem ", () => {
  let expectedMarkDownItem = {
    id: 3,
    markdownTitle: "test2.md",
    markdownContent: "testContent3",
    markdownDate: Date,
  };
  store.removeMarkdownItem(expectedMarkDownItem.id);
  expect(store.getMarkdownList()).not.toContainEqual(expectedMarkDownItem);
});

test("unshiftMarkdownItem", () => {
  let currentMarkdown = {
    id: 3,
    markdownTitle: "test2.md",
    markdownContent: "testContent3",
    markdownDate: Date,
  };
  store.setCurrentMarkdown(currentMarkdown);
  store.unshiftMarkdownItem();
  expect(store.getMarkdownList()[0]).toEqual(currentMarkdown);
});

test("getDateFormat", () => {
  const date = new Date();
  const monthName = store.months[date.getMonth()];
  const expectedDateString = `${date.getDate()} ${monthName} ${date.getFullYear()}`;

  expect(store.getDateFormat()).toMatch(expectedDateString);
});

test("editMarkdown should update an item in localstorage", () => {
  let oldMarkdown = {
    id: 3,
    markdownTitle: "test3.md",
    markdownContent: "here we have old content",
    markdownDate: Date,
  };
  window.localStorage.setItem(oldMarkdown.id, JSON.stringify(oldMarkdown));
  expect(localStorage.getItem(oldMarkdown.id)).toEqual(
    JSON.stringify(oldMarkdown)
  );
  let newUpdatedMarkdown = store.getMarkdownItem(oldMarkdown.id);
  newUpdatedMarkdown.markdownDate = store.getDateFormat();

  store.editMarkdown(newUpdatedMarkdown.id);
  expect(localStorage.getItem(newUpdatedMarkdown.id)).toEqual(
    JSON.stringify(newUpdatedMarkdown)
  );
});
