import { FormTypes } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/text-input";
import { loginSchema } from "@/utils/form-schemas/login-schema";
import { loginUser } from "@/services/api/user/login-user";
import { useState } from "react";
import { useAppState } from "@/state/app-state";

type LoginFormProps = {
  setShowRegister: (showRegister: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

export const LoginForm = ({
  setShowRegister,
  setIsModalOpen,
}: LoginFormProps) => {
  const { setUser } = useAppState((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormTypes>({
    resolver: zodResolver(loginSchema),
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (formData: FormTypes) => {
    try {
      const isUserLoggedIn = await loginUser(formData);
      if (isUserLoggedIn.status === 200 && isUserLoggedIn.data) {
        setUser({
          email: isUserLoggedIn.data.email,
          name: isUserLoggedIn.data.name,
          id: isUserLoggedIn.data.sys.id,
        });
        setTimeout(() => {
          setIsModalOpen(false);
          reset();
        }, 1000);
      } else if (
        isUserLoggedIn.status === 401 ||
        isUserLoggedIn.status === 404
      ) {
        setError("Invalid email or password");
        reset();
      } else {
        setError("Something went wrong. Please try again later.");
        reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-w-[15rem] flex-col gap-2"
        aria-errormessage="login-form-error"
      >
        <p
          id="login-form-error"
          aria-live="polite"
          className="body-in-app mt-1 h-3 py-1 text-red-600"
        >
          {error}
        </p>
        <TextInput
          name="email"
          label="Email:"
          type="email"
          placeholder="Write your email here"
          register={register}
          errors={errors}
        />
        <TextInput
          name="password"
          label="Password:"
          type="password"
          placeholder="Write your password here"
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          className="heading-m-in-app mt-2 flex items-center justify-center rounded-md bg-customOrange p-3 font-light text-white transition-all duration-300 hover:bg-customOrangeHover sm:px-4"
        >
          <p>Login</p>
        </button>
      </form>
      <p className="mt-2 flex flex-col items-center">
        <span>Don't have account yet? </span>
        <button
          onClick={() => setShowRegister(true)}
          className="font-semibold text-customOrange transition-colors duration-300 hover:text-customOrangeHover hover:underline"
        >
          Register here
        </button>
      </p>
    </>
  );
};
