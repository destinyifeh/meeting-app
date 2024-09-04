import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from "zod";

type ForgotPasswordProps = {
  // handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  // handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  //callback:()=>void | null,
  handleChange: (value: string) => void;
};

const schema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
    // .regex(/[A-Z]/, 'Confirm Password must contain at least one uppercase letter')
    // .regex(/[a-z]/, 'Confirm Password must contain at least one lowercase letter')
    // .regex(/[0-9]/, 'Confirm Password must contain at least one number')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path to the field where the error should be displayed
  });

type FormValues = z.infer<typeof schema>;

export const SuperAdminResetForgotPasswordForm = (): React.JSX.Element => {
  const [isClear, setIsClear] = React.useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    clearErrors,
    reset,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    // mode: 'onChange',
  });

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  console.log(errors, "myu errrr88");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data:", data);
    console.log("Is submitting:", isSubmitting);
    console.log("passwordfrom form state:", password);

    reset({ password: "" });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //"input-border-color": "#1D1D1F",
  return (
    <div>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <h3 className="text-2xl text-center font-bold text-black leading-9 pb-2">
            Set a new password
          </h3>
          <p className="text-center text-sm text-black w-[320px]">
            Create a new password. Ensure it differs from previous ones for
            security
          </p>
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            placeholder="Enter a new password"
            {...register("password")}
            className="px-3 outline-none text-black bg-white w-[320px] h-[45px] rounded-[5px] border-[0.2px] border-input-border-color"
          />
          {errors?.password && password && (
            <p className="text-red-500 text-center text-sm pt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <input
            type="password"
            //value={email}
            placeholder="Re-enter password "
            {...register("confirmPassword")}
            className="px-3 outline-none text-black bg-white w-[320px] h-[45px] rounded-[5px] border-[0.2px] border-input-border-color"
          />
          {errors?.confirmPassword && confirmPassword && (
            <p className="text-red-500 text-center text-sm pt-1">
              {errors.confirmPassword.message}
            </p>
          )}
          <span
            onClick={togglePasswordVisibility}
            className="absolute cursor-pointer left-3"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} color="black" />
            ) : (
              <AiOutlineEye size={20} color="black" />
            )}
          </span>
        </div>

        <div>
          <button
            type="submit"
            className={`w-[320px] h-[45px] rounded-[5px] text-base 
           ${password === "" || isSubmitting ? `bg-[#EDEDED] cursor-not-allowed text-[#9C9C9C]` : `bg-[#ED1C24] hover:bg-red-600 active:bg-red-700 text-white`}`}
          >
            Update Password
          </button>
        </div>
        <span className="text-sm leading-4 font-normal  mt-3 text-center">
          {" "}
          <Link href="" className="text-[#ED1C24]">
            * click here{" "}
          </Link>
          <span className="text-black">to go back to sign in page.</span>
        </span>
      </form>
    </div>
  );
};
