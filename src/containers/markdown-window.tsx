import { WindowHeading } from "@/components/window-heading";
import { useDetectMobile } from "@/hooks/useDetectMobile";

type MarkdownWindowProps = {
  data: string;
  showPreview: boolean;
  toggleShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  showMarkdown: boolean;
  toggleShowMarkdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MarkdownWindow = ({
  data,
  showPreview,
  toggleShowPreview,
  showMarkdown,
  toggleShowMarkdown,
}: MarkdownWindowProps) => {
  const isMobile = useDetectMobile();

  return (
    <div>
      <WindowHeading
        title="Markdown"
        show={isMobile ? showMarkdown : showPreview}
        toggleShow={isMobile ? toggleShowMarkdown : toggleShowPreview}
        hideToggleButtonOnDesktop
      />
      <p className="markdown whitespace-pre-line p-5">{data}</p>
    </div>
  );
};
