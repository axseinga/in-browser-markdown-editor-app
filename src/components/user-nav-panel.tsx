import { IconLogin } from "./icons/icon-login";
import { useAppState } from "@/state/app-state";
import { DialogT } from "@/types";

type UserNavProps = {
  setIsDialogOpen: (isOpen: boolean) => void;
  setDialogId: (id: DialogT) => void;
};

export const UserNavPanel = ({
  setIsDialogOpen,
  setDialogId,
}: UserNavProps) => {
  const { user } = useAppState();
  return (
    <>
      {user ? (
        <div className="flex items-center gap-3">
          <p className="heading-s-in-app text-customGrey-300">
            Hi, {user.name}
          </p>
          <button
            aria-label="Log out"
            onClick={() => {
              setIsDialogOpen(true);
              setDialogId("logout");
            }}
          >
            <IconLogin color="#E46643" />
          </button>
        </div>
      ) : (
        <button
          aria-label="Login"
          onClick={() => {
            setIsDialogOpen(true);
            setDialogId("login");
          }}
        >
          <IconLogin />
        </button>
      )}
    </>
  );
};
