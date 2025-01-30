import { useState } from "react";
import { LoginForm } from "@/containers/login-form";
import { RegisterForm } from "@/containers/register-form";

export const LoginModalBody = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="preview-paragraph flex max-w-[30rem] flex-col gap-3 bg-white p-6 text-customGrey-500 dark:bg-customGrey-900 dark:text-customGrey-400">
      {!showRegister ? (
        <LoginForm setShowRegister={setShowRegister} />
      ) : (
        <RegisterForm setShowRegister={setShowRegister} />
      )}
    </div>
  );
};
