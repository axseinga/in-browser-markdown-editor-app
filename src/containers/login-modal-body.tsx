import { useState } from "react";
import { LoginForm } from "@/containers/login-form";
import { RegisterForm } from "@/containers/register-form";

type LoginModalBodyProps = {
  setIsModalOpen: (isOpen: boolean) => void;
};

export const LoginModalBody = ({ setIsModalOpen }: LoginModalBodyProps) => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="preview-paragraph flex max-w-[30rem] flex-col gap-3 bg-white p-6 text-customGrey-500 dark:bg-customGrey-900 dark:text-customGrey-400">
      {!showRegister ? (
        <LoginForm
          setShowRegister={setShowRegister}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <RegisterForm
          setShowRegister={setShowRegister}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};
