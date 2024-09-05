"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, InputField, PasswordInputField } from "@vms/ui";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export const loginScheme = z.object({
  password: z.string().trim().min(1, { message: "Password is required" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
});

type FormValue = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [isChecked] = useState(true);

  const router = useRouter();

  const methods = useForm<FormValue>({
    resolver: zodResolver(loginScheme),
    mode: "onChange",
  });

  const { register, handleSubmit } = methods;

  const onSubmit = async (data: FormValue) => {
    router.push("/app/dashboard");
  };
  return (
    <FormProvider {...methods}>
      <form
        className="w-full block mb-[1.6rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <div className="space-y-4">
            <InputField
              type="email"
              placeholder="Email"
              containerClassName="mb-3"
              className=" w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-brand text-[16px]"
              {...register("email")}
            />

            <PasswordInputField
              type="password"
              placeholder="Password"
              className="w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-brand text-[16px]"
              {...register("password")}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-xl text-brand leading-[16.8px] gap-2">
            <Checkbox checked={isChecked} />
            Remember me
          </label>
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="large"
          className="w-full"
        >
          Log In
        </Button>
      </form>
    </FormProvider>
  );
};
