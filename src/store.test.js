import { beforeEach, expect, test } from "vitest";
import { store } from "./store";

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
      markdownTitle: "test2.md",
      markdownContent: "testContent3",
      markdownDate: Date,
    },
  ];
  const localStorageList = [
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
      markdownTitle: "test2.md",
      markdownContent: "testContent3",
      markdownDate: Date,
    },
  ];
  store.setMarkdownList(markdownList);
  store.setMarkdownLocalStorage(localStorageList);
});

test("getMarkdownItem", () => {
  let expectedMarkDownItem = {
    id: 3,
    markdownTitle: "test2.md",
    markdownContent: "testContent3",
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
