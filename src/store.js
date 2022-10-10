import { reactive } from "vue";

export const store = reactive({
  currentMarkdown: {
    id: "",
    markdownTitle: "",
    markdownContent: "",
    markdownDate: Date,
  },
  markdownList: [],

  init() {
    if (window.localStorage.length >= 1) {
      for (let i = 0; i < window.localStorage.length; i++) {
        let key = window.localStorage.key(i);
        const localStorageItem = JSON.parse(window.localStorage.getItem(key));
        this.markdownList.push(localStorageItem);
      }
      this.currentMarkdown = this.markdownList[0];
    }
  },
  getCurrentMarkdown() {
    return this.currentMarkdown;
  },
  getMarkdownList() {
    return this.markdownList;
  },
  getDateFormat() {
    const date = new Date();
    const monthName = store.months[date.getMonth()];
    return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
  },
  setCurrentMarkdown(newMarkdown) {
    this.currentMarkdown = newMarkdown;
  },
  getMarkdownItem(markdownId) {
    return this.markdownList.find((markdown) => markdown.id === markdownId);
  },
  months: {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  },
});
store.init();
