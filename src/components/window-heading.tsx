import { useAppState } from "@/state/app-state";
import { IconShowHidePreview } from "@/components/icons/icon-show-hide-preview";

type WindowHeadingProps = {
  title: string;
  hideToggleButtonOnDesktop?: boolean;
};

export const WindowHeading = ({
  title,
  hideToggleButtonOnDesktop,
}: WindowHeadingProps) => {
  const { showMarkdown } = useAppState();

  return (
    <div className="flex h-[2.625rem] w-full items-center justify-between bg-customGrey-200 pl-5 pr-1 dark:bg-customGrey-900">
      <p className="heading-s-in-app py-5 uppercase text-customGrey-500 dark:text-customGrey-400">
        {title}
      </p>
      <button
        onClick={() => useAppState.getState().toggleShowMarkdown()}
        className={`flex h-[2.2rem] w-[2.2rem] items-center justify-center ${hideToggleButtonOnDesktop ? "md:hidden" : ""}`}
      >
        <IconShowHidePreview show={showMarkdown} />
      </button>
    </div>
  );
};
