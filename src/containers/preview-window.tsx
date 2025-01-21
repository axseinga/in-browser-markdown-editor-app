import { MarkdownRewrite } from "@/components/markdown-rewrite";
import { WindowHeading } from "@/components/window-heading";

type PreviewWindowProps = {
  data: string;
  show: boolean;
  toggleShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PreviewWindow = ({ data, show, toggleShow }: PreviewWindowProps) => {
  return (
    <div>
      <WindowHeading title="Preview" show={show} toggleShow={toggleShow}/>
      <div className="markdown whitespace-pre-line p-5">
        <MarkdownRewrite data={data} />
      </div>
    </div>
  );
};
