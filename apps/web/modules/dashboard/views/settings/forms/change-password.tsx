"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputField } from "@vms/ui";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    currentPassword: z.string().trim(),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Path to the field where the error should be displayed
  });

type FormValue = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export const ChangePasswordForm: React.FC = () => {
  const methods = useForm<FormValue>({
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

  const password = watch("newPassword", "");
  const confirmPassword = watch("confirmPassword", "");

  const onSubmit = async (data: FormValue) => {
    console.log(data, "daaa");
  };
  return (
    <FormProvider {...methods}>
      <form
        className="flex w-[32rem] flex-col mt-8 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <div className="space-y-4">
            <InputField
              type="password"
              placeholder="Current Password"
              className="w-full p-4 rounded-lg text-brand h-[4.5rem] placeholder:text-[14px] text-[16px]"
              {...register("currentPassword")}
            />

            <InputField
              type="password"
              placeholder="New Password"
              className="w-full p-4 rounded-lg text-brand  h-[4.5rem] placeholder:text-[14px] text-[16px]"
              {...register("newPassword")}
            />
            <InputField
              type="password"
              placeholder="Confirm Password"
              className="w-full p-4 rounded-lg text-brand  h-[4.5rem] placeholder:text-[14px] text-[16px]"
              {...register("confirmPassword")}
            />
          </div>
        </div>

        <Button
          type="submit"
          // variant={password === "" || isSubmitting ? "secondary" : "primary"}
          size="large"
          className="w-[175px] border-width-[0.5px] border-red-500 bg-white text-red-500 hover:bg-white active:bg-white-700 text-[15px]"
          disabled={password === "" || isSubmitting}
        >
          Change Password
        </Button>
      </form>
    </FormProvider>
  );
};
