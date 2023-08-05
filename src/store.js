import { reactive } from "vue";

export const store = reactive({
  api: "http://localhost:8000/api/v1/markdowns",
  currentMarkdown: {
    _id: "",
    title: "",
    text: "",
    createdAt: new Date(),
  },
  markdownList: [],
  isDarkMode: false,

  async getMarkdowns() {
    const result = await fetch(this.api);
    const data = await result.json();
    const markdowns = data.data.markdowns;

    if (!markdowns.length <= 0) {
      for (let i = 0; i < markdowns.length; i++) {
        markdowns[i].createdAt = this.getDateFormat(markdowns[i].createdAt);
        this.markdownList.push(markdowns[i]);
      }
      console.log("Markdowns", this.markdownList);
    } else {
      //create welcome.md on first use
      const welcomeMarkdown = {
        _id: new Date().toISOString(),
        title: "welcome.md",
        createdAt: this.getDateFormat(),
        text: this.dontIndent(),
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
  getCurrentMarkdown() {
    return this.currentMarkdown;
  },
  setCurrentMarkdown(newMarkdown) {
    this.currentMarkdown = newMarkdown;
  },
  getDateFormat(dateString) {
    const date = new Date(dateString);
    const monthName = store.months[date.getMonth()];
    return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
  },
  getMarkdownItem(markdownId) {
    return this.markdownList.find((markdown) => markdown._id === markdownId);
  },
  removeMarkdownItem(markdownId) {
    const removeIndex = this.markdownList.findIndex((markdown) => markdown._id === markdownId);
    if (removeIndex != -1) {
      this.markdownList.splice(removeIndex, 1);
    }
  },
  createMarkdown() {
    const newMarkdown = {
      _id: "",
      title: "",
      text: "",
      createdAt: Date,
    };
    this.currentMarkdown = newMarkdown;
  },
  async editMarkdown() {
    const currentMarkdown = this.currentMarkdown;
    try {
      let result;
      if (currentMarkdown._id !== "") {
        result = await fetch(`${this.api}/${currentMarkdown._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: currentMarkdown.title, text: currentMarkdown.text }),
        });
        const data = await result.json();
        this.currentMarkdown = data.data.updateMarkdown;
      } else {
        result = await fetch(this.api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: currentMarkdown.title, text: currentMarkdown.text }),
        });
        const data = await result.json();
        this.currentMarkdown = data.data.newMarkdown;
        this.markdownList.push(this.currentMarkdown);
      }
    } catch (error) {
      console.log(`Error:${error.message}`);
    }
  },
  async deleteMarkdown() {
    this.removeMarkdownItem(this.currentMarkdown._id);
    const result = await fetch(`${this.api}/${this.currentMarkdown._id}`, {
      method: "DELETE",
    });
    if (this.markdownList.length > 0) {
      this.setCurrentMarkdown(this.markdownList[0]);
    } else {
      this.setCurrentMarkdown({
        id: "",
        markdownTitle: "",
        markdownContent: "",
        markdownDate: Date,
      });
    }
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
store.getMarkdowns();
