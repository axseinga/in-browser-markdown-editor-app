import { FormTypes } from "@/types";
import { InputHTMLAttributes } from "react";
import { Path, UseFormRegister, FieldErrorsImpl } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<FormTypes>;
  label?: string;
  type: "text" | "number" | "email" | "password";
  placeholder: string;
  register: UseFormRegister<FormTypes>;
  errors: Partial<FieldErrorsImpl<FormTypes>>;
  color?: string;
  defaultValue?: string;
}

export const TextInput = ({
  name,
  label,
  type,
  placeholder,
  register,
  errors,
  defaultValue,
}: TextInputProps) => {
  const errorMsg: string | undefined = errors?.[name]?.message;
  const hasError = Boolean(errors && errorMsg);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          aria-describedby={`${name}-input-validation`}
          {...(register && register(name))}
          name={name}
          defaultValue={defaultValue}
          className="body-in-app rounded-md border-2 border-customGrey-300 p-2 focus:outline-none focus:ring-2 focus:ring-customOrangeHover dark:border-customGrey-500 dark:bg-customGrey-700 dark:text-customGrey-400"
        />
      </div>
      <p
        id={`${name}-input-validation`}
        aria-live="polite"
        className="body-in-app mt-1 h-3 py-1 text-red-600 dark:text-red-400"
      >
        {hasError && errorMsg}
      </p>
    </div>
  );
};
