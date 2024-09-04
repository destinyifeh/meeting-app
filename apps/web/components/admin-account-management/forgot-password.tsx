import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
type ForgotPasswordProps = {
  // handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  // handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
  //callback:()=>void | null,
  handleChange: (value: string) => void;
};

const schema = z.object({
  email: z.string().email("Invalid email address"),
  // password: z.string().min(6, 'Password must be at least 6 characters long'),
});
type FormValues = z.infer<typeof schema>;

export const SuperAdminForgotPassword = (): React.JSX.Element => {
  const [isClear, setIsClear] = React.useState(false);

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

  const email = watch("email", "");

  console.log(errors, "myu errrr88");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data:", data);
    console.log("Is submitting:", isSubmitting);
    console.log("Email from form state:", email);

    reset({ email: "" });
  };

  return (
    <div>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <h3 className="text-2xl text-center font-bold text-black leading-9 pb-2">
            Reset Password
          </h3>
          <p className="text-center text-sm text-black">
            Enter your Email to reset the password.
          </p>
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            placeholder="Enter Email Address"
            {...register("email")}
            className="px-3 outline-none text-black bg-white w-[320px] h-[45px] rounded-[5px] border-[0.2px] border-input-border-color"
          />
          {errors?.email && email && (
            <p className="text-red-500 text-center text-sm pt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className={`w-[320px] h-[45px] rounded-[5px] text-base 
           ${email === "" || isSubmitting ? `bg-[#EDEDED] cursor-not-allowed text-[#9C9C9C]` : `bg-[#ED1C24] hover:bg-red-600 active:bg-red-700 text-white`}`}
          >
            Reset Password
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
