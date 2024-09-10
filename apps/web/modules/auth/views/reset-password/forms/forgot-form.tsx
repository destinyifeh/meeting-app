"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputField } from "@vms/ui";
import Link from "next/link";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
interface ForgotPasswordProps {
  updateScreen: (value: string) => void;
}

const schema = z.object({
  email: z.string().trim().email("Invalid email address"),
});
type FormValues = z.infer<typeof schema>;

export const SuperAdminForgotPasswordForm = ({
  updateScreen,
}: ForgotPasswordProps): React.JSX.Element => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = methods;
  const email = watch("email", "");

  console.log(errors, "myu errrr88");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data:", data);
    console.log("Is submitting:", isSubmitting);
    console.log("Email from form state:", email);
    updateScreen("emailSent");
    reset({ email: "" });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex w-[32rem] flex-col "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-5">
          <h2 className="leading-[3.6rem] text-brand font-bold text-[2.4rem] mb-[1.3rem] text-center">
            Reset Password
          </h2>
          <p className="text-brand text-center font-normal text-[1.4rem] leading-[16.8px]">
            Enter your Email to reset the password.
          </p>
        </div>

        <div className="mb-6">
          <InputField
            type="email"
            placeholder="Email"
            containerClassName="mb-3"
            className=" w-full p-4 rounded-lg text-brand h-[4.5rem] placeholder:text-[14px] text-[16px]"
            {...register("email")}
          />
        </div>

        <Button
          type="submit"
          variant={email === "" || isSubmitting ? "secondary" : "danger"}
          size="large"
          className="w-full"
        >
          Reset Password
        </Button>

        <div className="mt-5 text-center">
          <span className="text-brand text-center font-normal text-[1.4rem] leading-[16.8px]">
            {" "}
            <Link href="/auth/login" className="text-[#ED1C24]">
              * click here{" "}
            </Link>
            <span className="text-brand">to go back to sign in page.</span>
          </span>
        </div>
      </form>
    </FormProvider>
  );
};
