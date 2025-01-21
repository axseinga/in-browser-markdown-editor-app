import { WindowHeading } from "@/components/window-heading";

type MarkdownWindowProps = {
  data: string;
};

export const MarkdownWindow = ({ data }: MarkdownWindowProps) => {
  return (
    <div>
      <WindowHeading title="Markdown" hideToggleButtonOnDesktop />
      <p className="markdown whitespace-pre-line p-5">{data}</p>
    </div>
  );
};
