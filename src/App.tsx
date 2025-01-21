import { useState } from "react";
import { Nav } from "./components/nav";
import { SidebarMenu } from "./components/sidebar-menu";
import { PreviewWindow } from "./containers/preview-window";
import { MarkdownWindow } from "./containers/markdown-window";
import { useAppState } from "./state/app-state";

const App = () => {
  // const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { showSidebar, showMarkdown } = useAppState();
  const [file, setFile] = useState({
    id: "AHdddcdBHD",
    createdAt: "04-01-2022",
    name: "welcome.md",
    content:
      "# Welcome to Markdown\n\nMarkdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.\n\n## How to use this?\n\n1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n### Features\n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: `<p>I'm inline</p>`. It also allows for larger code blocks like this:\n\n```\n<main>\n  <h1>This is a larger code block</h1>\n</main>\n```",
  });

  return (
    <div className="relative flex overflow-hidden">
      <SidebarMenu/>
      <div
        className={`w-full flex-shrink-0 transition-transform duration-300 ${
          showSidebar ? "translate-x-0" : "-translate-x-[15.625rem]"
        }`}
      >
        <Nav/>
        <div className="flex flex-col sm:grid sm:grid-cols-2">
          {showMarkdown && <MarkdownWindow data={file.content} />}
          <PreviewWindow data={file.content} />
        </div>
      </div>
    </div>
  );
};

export default App;
