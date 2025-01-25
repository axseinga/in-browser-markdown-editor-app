import { WindowHeading } from "@/components/window-heading";

type MarkdownWindowProps = {
  contentInput: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const MarkdownWindow = ({
  contentInput,
  handleChange,
}: MarkdownWindowProps) => {
  return (
    <div className="border-r-2 border-customGrey-300">
      <WindowHeading title="Markdown" hideToggleButtonOnDesktop />
      <textarea
        className="markdown h-full w-full whitespace-pre-line bg-transparent p-5 focus:outline-none"
        value={contentInput}
        onChange={handleChange}
      />
    </div>
  );
};
