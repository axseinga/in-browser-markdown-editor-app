import { FormTypes } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/text-input";
import { loginSchema } from "@/utils/form-schemas/login-schema";

type LoginFormProps = {
  setShowRegister: (showRegister: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};

export const LoginForm = ({
  setShowRegister,
  setIsModalOpen,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormTypes>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (formData: FormTypes) => {
    try {
      // login to make call to backend
      //   if (res.status === 201) {
      //     reset();
      // after a few seconds, close the modal
      //   }
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
      >
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
