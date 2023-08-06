import { reactive } from "vue";
import { DefaultApi, MarkdownCreate, MarkdownResponse, MarkdownResult } from "./generated/api";

export const store = reactive({
  host: "http://localhost:8000",
  currentMarkdown: {
    id: "",
    title: "",
    text: "",
    createdAt: new Date(),
  } as MarkdownResponse,
  markdownList: [] as MarkdownResponse[],
  isDarkMode: false,

  async getMarkdowns() {
    /*
    const result = await fetch(this.api);
    const data = await result.json();
    const markdowns = data.data.markdowns;

    */
    const response = await new DefaultApi(null!, this.host).apiV1MarkdownsGet();
    const markdowns: MarkdownResponse[] = response.data?.markdowns!;
    if (markdowns.length) {
      for (let i = 0; i < markdowns.length; i++) {
        //markdowns[i].createdAt = new Date(this.getDateFormat(markdowns[i].createdAt));
        this.markdownList.push(markdowns[i]);
      }
    } else {
      //create welcome.md on first use
      const welcomeMarkdown = {
        _id: new Date().toISOString(),
        title: "welcome.md",
        //createdAt: new Date(this.getDateFormat()),
        text: this.dontIndent(),
      };
      this.markdownList.push(welcomeMarkdown);
    }
    this.currentMarkdown = this.markdownList[0];
    console.log(this.markdownList);
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
  setMarkdownList(markdownList: MarkdownResponse[]) {
    this.markdownList = markdownList;
  },
  getCurrentMarkdown() {
    return this.currentMarkdown;
  },
  setCurrentMarkdown(newMarkdown: MarkdownResponse) {
    this.currentMarkdown = newMarkdown;
  },
  getDateFormat(dateString?: string) {
    if (dateString) {
      const date = new Date(dateString);
      const monthNumber = date.getMonth();
      const monthName = Object.values(store.months)[monthNumber];
      return `${date.getDate()} ${monthName} ${date.getFullYear()}`;
    }
  },
  getMarkdownItem(markdownId: string) {
    return this.markdownList.find((markdown) => markdown.id === markdownId);
  },
  removeMarkdownItem(markdownId: string) {
    const removeIndex = this.markdownList.findIndex((markdown) => markdown.id === markdownId);
    if (removeIndex != -1) {
      this.markdownList.splice(removeIndex, 1);
    }
  },
  createMarkdown() {
    const newMarkdown: MarkdownResponse = {
      id: "",
      title: "",
      text: "",
      createdAt: null!,
    };
    this.currentMarkdown = newMarkdown;
  },
  async editMarkdown() {
    try {
      if (this.currentMarkdown.id === "") {
        const newMarkdown = await new DefaultApi(null!, this.host).apiV1MarkdownsPost({
          title: this.currentMarkdown.title,
          text: this.currentMarkdown.text,
        });
        this.currentMarkdown = newMarkdown.data!;
      } else {
        const response: MarkdownResult = await new DefaultApi(null!, this.host).apiV1MarkdownsIdPatch(
          this.currentMarkdown.id!,
          this.currentMarkdown
        );
      }
    } catch (error: any) {
      console.log(`Error:${error.message}`);
    }
  },
  async deleteMarkdown() {
    this.removeMarkdownItem(this.currentMarkdown.id!);
    await new DefaultApi(null!, this.host).apiV1MarkdownsIdDelete(this.currentMarkdown.id!);
    if (this.markdownList.length > 0) {
      this.setCurrentMarkdown(this.markdownList[0]);
    } else {
      this.setCurrentMarkdown({
        id: "",
        title: "",
        text: "",
        createdAt: null!,
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
