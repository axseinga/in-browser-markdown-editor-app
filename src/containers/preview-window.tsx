import { MarkdownRewrite } from "@/components/markdown-rewrite";
import { WindowHeading } from "@/components/window-heading";
import { useAppState } from "@/state/app-state";

type PreviewWindowProps = {
  data: string;
};

export const PreviewWindow = ({ data }: PreviewWindowProps) => {
  const { showMarkdown } = useAppState();
  return (
    <div>
      <WindowHeading title="Preview" />
      <div
        className={`markdown whitespace-pre-line p-5 ${!showMarkdown ? "max-w-[45rem] m-auto" : ""}`}
      >
        <MarkdownRewrite data={data} />
      </div>
    </div>
  );
};
