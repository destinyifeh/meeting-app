"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, PasswordInputField, showToast } from "@vms/ui";
import classNames from "classnames";
import Link from "next/link";

// import { ErrorMessageProps } from "app/_types";
import { ErrorMessageProps, ServerResponse } from "app/_types";
import { useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import {
  createPasswordInput,
  createPasswordSchema,
  useCreatePassword,
} from "~/auth/api/create-password";

import { ErrorMessage } from "../login/form";

export const CreatePasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<createPasswordInput>({
    resolver: zodResolver(createPasswordSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;

  const onSuccess = (response: ServerResponse<Record<string, string>>) => {
    // router.replace(`/auth/login`);

    if (response.data) {
      showToast("Password created successfully", "success");
      router.replace(`/auth/login`);
    }
  };

  const createPassword = useCreatePassword({
    onSuccess,
  });

  const onSubmit = (data: createPasswordInput) => {
    const payload = {
      token: searchParams.get("code") as string,
      password: data.password,
    };

    createPassword.mutate(payload);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <h2 className="leading-[3.6rem]  text-black font-bold text-[2.4rem] mb-[1.3rem] text-center">
            Set a new password
          </h2>
          <p className="text-black text-center font-normal text-[1.4rem] leading-[16.8px]">
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
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
            />
          </div>
        </div>

        {createPassword.isError &&
          createPassword.error?.message !== "Unauthorized" && (
            <ErrorMessage
              {...(JSON.parse(createPassword.error?.message)
                ?.error as ErrorMessageProps)}
            />
          )}

        {createPassword.data && createPassword.data.error && (
          <ErrorMessage {...createPassword.data.error} />
        )}

        <Button
          type="submit"
          variant="secondary"
          size="large"
          loading={createPassword.isPending}
          disabled={createPassword.isPending}
          className={classNames(
            formState.isValid
              ? "bg-brand-default text-brand hover:bg-brand-default"
              : "cursor-not-allowed",
            "w-full",
            createPassword.isPending && "opacity-60"
          )}
        >
          Create Password
        </Button>

        <div className="mt-5 text-center">
          <span className="text-black text-center font-normal text-[1.4rem] leading-[16.8px]">
            {" "}
            <Link href="/auth/login" className="text-solid">
              * click here{" "}
            </Link>
            <span className="text-black">to go back to sign in page.</span>
          </span>
        </div>
      </form>{" "}
    </FormProvider>
  );
};
