"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInputField } from "@vms/ui";
import Link from "next/link";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface ResetPasswordProps {
  updateScreen: (value: string) => void;
}

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

export const SuperAdminResetForgotPasswordForm = ({
  updateScreen,
}: ResetPasswordProps): React.JSX.Element => {
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

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  console.log(errors, "myu errrr88");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form data:", data);
    console.log("Is submitting:", isSubmitting);
    console.log("passwordfrom form state:", password);
    updateScreen("success");
    reset({ password: "" });
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <h2 className="leading-[3.6rem] font-bold text-[2.4rem] mb-[1.3rem] text-center">
            Set a new password
          </h2>
          <p className="text-brand-text text-center font-normal text-[1.4rem] leading-[16.8px]">
            Create a new password. Ensure it differs from previous ones for
            security
          </p>
        </div>
        <div className="mb-6">
          <div className="space-y-4">
            <PasswordInputField
              type="password"
              placeholder="Password"
              className="w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
              {...register("password")}
            />

            <PasswordInputField
              type="password"
              placeholder="Password"
              className="w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
              {...register("confirmPassword")}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant={password === "" || isSubmitting ? "secondary" : "danger"}
          size="large"
          className="w-full"
          disabled={password === "" || isSubmitting}
        >
          Update Password
        </Button>

        <div className="mt-5 text-center">
          <span className="text-brand-text text-center font-normal text-[1.4rem] leading-[16.8px]">
            {" "}
            <Link href="/auth/login" className="text-[#ED1C24]">
              * click here{" "}
            </Link>
            <span className="text-brand-text">to go back to sign in page.</span>
          </span>
        </div>
      </form>
    </FormProvider>
  );
};
