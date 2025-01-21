import { WindowHeading } from "@/components/window-heading";
import { useAppState } from "@/state/app-state";

type MarkdownWindowProps = {
  data: string;
};

export const MarkdownWindow = ({ data }: MarkdownWindowProps) => {
  const { showMarkdown } = useAppState();

  return (
    <div>
      <WindowHeading
        title="Markdown"
        show={showMarkdown}
        hideToggleButtonOnDesktop
      />
      <p className="markdown whitespace-pre-line p-5">{data}</p>
    </div>
  );
};
