import { FormTypes } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/text-input";
import { registerSchema } from "@/utils/form-schemas/register-schema";
import { registerUser } from "@/services/api/user/register-user";

type LoginFormProps = {
  setShowRegister: (showRegister: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

export const RegisterForm = ({ setShowRegister }: LoginFormProps) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormTypes>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (formData: FormTypes) => {
    try {
      setError("");
      const res = await registerUser(formData);
      console.log(res);
      if (res && res.status === 200) {
        reset();
        setIsFormSubmitted(true);
      } else {
        setError(res.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  return (
    <>
      {isFormSubmitted ? (
        <p className="mt-2 flex flex-col items-center gap-4 dark:text-customGrey-400">
          <span className="preview-h6 text-xl">Success!</span>
          <span>Your account has been created.</span>
          <button
            onClick={() => setShowRegister(false)}
            className="heading-m-in-app mt-2 flex items-center justify-center rounded-md bg-customOrange p-3 font-light text-white transition-all duration-300 hover:bg-customOrangeHover sm:px-4"
          >
            Login here
          </button>
        </p>
      ) : (
        <>
          <p
            aria-live="polite"
            className="body-in-app mt-1 h-4 py-1 text-red-600 dark:text-red-400"
          >
            {error !== "" && error}
          </p>
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-w-[15rem] flex-col gap-2"
          >
            <TextInput
              name="name"
              label="Name:"
              type="text"
              placeholder="Write your name here"
              register={register}
              errors={errors}
            />
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
            <TextInput
              name="passwordConfirmation"
              label="Repeat password:"
              type="password"
              placeholder="Write your password again here"
              register={register}
              errors={errors}
            />
            <button
              type="submit"
              className="heading-m-in-app mt-2 flex items-center justify-center rounded-md bg-customOrange p-3 font-light text-white transition-all duration-300 hover:bg-customOrangeHover sm:px-4"
            >
              <p>Register</p>
            </button>
          </form>
          <p className="mt-2 flex flex-col items-center">
            <span>Have account already? </span>
            <button
              onClick={() => setShowRegister(false)}
              className="font-semibold text-customOrange transition-colors duration-300 hover:text-customOrangeHover hover:underline"
            >
              Login here
            </button>
          </p>
        </>
      )}
    </>
  );
};
