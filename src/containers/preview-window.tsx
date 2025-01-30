import { MarkdownRewrite } from "@/components/markdown-rewrite";
import { WindowHeading } from "@/components/window-heading";
import { useAppState } from "@/state/app-state";

type PreviewWindowProps = {
  data: string;
};

export const PreviewWindow = ({ data }: PreviewWindowProps) => {
  const { showMarkdown } = useAppState((state) => state);
  return (
    <div className="flex h-full flex-col justify-stretch">
      <WindowHeading title="Preview" />
      <div
        className={`markdown h-full whitespace-pre-line p-5 ${!showMarkdown ? "m-auto w-full max-w-[45rem]" : ""}`}
      >
        <MarkdownRewrite content={data} />
      </div>
    </div>
  );
};
