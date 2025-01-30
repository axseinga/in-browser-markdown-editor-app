import { MarkdownWindow } from "@/containers/markdown-window";
import { PreviewWindow } from "@/containers/preview-window";
import { useAppState } from "@/state/app-state";
import { MarkdownItemT } from "@/types";
import { useEffect, useState } from "react";

type MarkdownEditorProps = {
  showMarkdown: boolean;
  activeFile: MarkdownItemT;
};

export const MarkdownEditor = ({
  showMarkdown,
  activeFile,
}: MarkdownEditorProps) => {
  const [contentInput, setContentInput] = useState(activeFile.content);
  const { activeFileID, setEditingContent } = useAppState((state) => state);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentInput(e.target.value);
    setEditingContent(e.target.value);
  };

  useEffect(() => {
    setContentInput(activeFile.content);
  }, [activeFileID, activeFile.content]);

  return (
    <div
      className={`flex h-full flex-col sm:grid ${showMarkdown ? "grid-cols-2" : "grid-cols-1"}`}
    >
      {showMarkdown && (
        <MarkdownWindow
          contentInput={contentInput}
          handleChange={handleChange}
        />
      )}
      <PreviewWindow data={contentInput} />
    </div>
  );
};
