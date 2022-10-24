import { reactive } from "vue";

export const store = reactive({
  currentMarkdown: {
    id: "",
    markdownTitle: "",
    markdownContent: "",
    markdownDate: Date,
  },
  markdownList: [],
  isDarkMode: false,

  init() {
    if (window.localStorage.length > 0) {
      for (let i = 0; i < window.localStorage.length; i++) {
        let key = window.localStorage.key(i);
        const localStorageItem = JSON.parse(window.localStorage.getItem(key));
        this.markdownList.push(localStorageItem);
      }
    } else {
      //create welcome.md on first use
      const welcomeMarkdown = {
        id: new Date().toISOString(),
        markdownTitle: "welcome.md",
        markdownDate: this.getDateFormat(),
        markdownContent: this.dontIndent(),
      };
      this.markdownList.push(welcomeMarkdown);
    }
    this.currentMarkdown = this.markdownList[0];
  },
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  },
  showDarkMode() {
    return this.isDarkMode;
  },
  getMarkdownList() {
    return this.markdownList;
  },
  setMarkdownList(markdownList) {
    this.markdownList = markdownList;
  },
  setCurrentMarkdown(newMarkdown) {
    this.currentMarkdown = newMarkdown;
  },
  getDateFormat() {
    const date = new Date();
    const monthName = store.months[date.getMonth()];
    return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
  },
  getMarkdownItem(markdownId) {
    return this.markdownList.find((markdown) => markdown.id === markdownId);
  },
  removeMarkdownItem(markdownId) {
    const removeIndex = this.getMarkdownList().findIndex(
      (markdown) => markdown.id === markdownId
    );
    if (removeIndex != -1) {
      this.getMarkdownList().splice(removeIndex, 1);
    }
  },
  unshiftMarkdownItem() {
    this.removeMarkdownItem(this.currentMarkdown.id);
    this.getMarkdownList().unshift(this.currentMarkdown);
  },
  addMarkdown(currentMarkdown) {
    this.addLocalStorageItem(currentMarkdown);
    this.unshiftMarkdownItem();
  },
  updateMarkdown(currentMarkdown, localStorageItem) {
    this.updateLocalStorageItem(currentMarkdown, localStorageItem);
    this.unshiftMarkdownItem();
  },
  editMarkdown(markdownId) {
    const currentMarkdown = this.getMarkdownItem(markdownId);
    console.log(`CurrentMarkdown ${JSON.stringify(currentMarkdown)}`);
    try {
      const localStorageItem = JSON.parse(
        window.localStorage.getItem(currentMarkdown.id)
      );
      if (localStorageItem == null) return this.addMarkdown(currentMarkdown);
      this.updateMarkdown(currentMarkdown, localStorageItem);
    } catch (error) {
      console.log(`Error:${error.message}`);
    }
  },
  addLocalStorageItem(currentMarkdown) {
    currentMarkdown.markdownDate = store.getDateFormat();
    currentMarkdown.id = new Date().toISOString();
    window.localStorage.setItem(
      currentMarkdown.id,
      JSON.stringify(currentMarkdown)
    );
  },
  updateLocalStorageItem(currentMarkdown, localStorageItem) {
    localStorageItem.markdownTitle = currentMarkdown.markdownTitle;
    localStorageItem.markdownContent = currentMarkdown.markdownContent;
    localStorageItem.markdownDate = this.getDateFormat();
    window.localStorage.setItem(
      localStorageItem.id,
      JSON.stringify(localStorageItem)
    );
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
  dontIndent() {
    let markdownContentString = `# Welcome to Markdown

    Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.
    
    ## How to use this?
    
    1. Write markdown in the markdown editor window
    2. See the rendered markdown in the preview window
    
    ### Features
    
    - Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
    - Name and save the document to access again later
    - Choose between Light or Dark mode depending on your preference
    
    > This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).
    
    #### Headings
    
    To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.
    
    ##### Lists
    
    You can see examples of ordered and unordered lists above.
    
    ###### Code Blocks

    This markdown editor allows for inline-code snippets, like this: \`<p>I'm inline</p>\`. It also allows for larger code blocks like this:
    
    \`\`\`
    <main>
      <h1>This is a larger code block</h1>
    </main>
    \`\`\``;

    return markdownContentString.replace(/(\n)[^\S\r\n]+/g, "$1");
    //return markdownContentString;
  },
});
store.init();
