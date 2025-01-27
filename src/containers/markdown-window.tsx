import { WindowHeading } from "@/components/window-heading";
import TextareaAutosize from "react-textarea-autosize";

type MarkdownWindowProps = {
  contentInput: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const MarkdownWindow = ({
  contentInput,
  handleChange,
}: MarkdownWindowProps) => {
  return (
    <div className="text-customGrey-400 dark:border-customGrey-600 sm:border-r-2 sm:border-customGrey-300">
      <WindowHeading title="Markdown" hideToggleButtonOnDesktop />
      <TextareaAutosize
        className="markdown h-screen w-full whitespace-pre-line bg-transparent p-5 focus:outline-none dark:caret-customOrange text-customGrey-700 dark:text-customGrey-400"
        value={contentInput}
        onChange={handleChange}
      />
    </div>
  );
};
