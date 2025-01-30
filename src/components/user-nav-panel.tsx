import { IconLogin } from "@/components/icons/icon-login";
import { useAppState } from "@/state/app-state";
import { DialogIdEnum, DialogT } from "@/types";

export const UserNavPanel = () => {
  const { user, setIsDialogOpen, setDialogId } = useAppState((state) => state);

  const showDialog = (id: DialogT) => {
    setIsDialogOpen(true);
    setDialogId(id);
  };

  return (
    <>
      {user ? (
        <UserGreetings userName={user.name} showDialog={showDialog} />
      ) : (
        <LoginButton showDialog={showDialog} />
      )}
    </>
  );
};

type UserGreetingsProps = {
  userName: string;
  showDialog: (id: DialogT) => void;
};

const UserGreetings = ({ userName, showDialog }: UserGreetingsProps) => {
  return (
    <div className="flex items-center gap-3">
      <p className="heading-s-in-app text-customGrey-300">Hi, {userName}</p>
      <button
        aria-label="Logout"
        onClick={() => showDialog(DialogIdEnum.LOGOUT_ACTION)}
      >
        <IconLogin color="#E46643" />
      </button>
    </div>
  );
};

type LoginButtonProps = {
  showDialog: (id: DialogT) => void;
};

const LoginButton = ({ showDialog }: LoginButtonProps) => {
  return (
    <button
      aria-label="Login"
      onClick={() => showDialog(DialogIdEnum.LOGIN_ACTION)}
    >
      <IconLogin />
    </button>
  );
};
