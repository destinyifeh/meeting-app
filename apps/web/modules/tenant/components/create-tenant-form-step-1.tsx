"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetStep } from "@lib/hooks/useSetStep";
import { Button, InputField } from "@vms/ui";
import classNames from "classnames";
import { FormProvider, useForm } from "react-hook-form";
import {
  createTenantinInput,
  CreateTenantInputSchema,
} from "../api/create-tenant";

export type CreateTenantStepOneProps = {
  nextHandler: (req: createTenantinInput) => void;
};

export const CreateTenantStepOne = ({
  nextHandler,
}: CreateTenantStepOneProps) => {
  const setpStep = useSetStep();
  const methods = useForm<createTenantinInput>({
    resolver: zodResolver(CreateTenantInputSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = methods;

  const onSubmit = async (data: createTenantinInput) => {
    nextHandler(data);
    setpStep(2);
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
              type="text"
              placeholder="Tenant Name"
              containerClassName="mb-3"
              {...register("name")}
              className=" w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
            />
            <InputField
              type="email"
              {...register("email")}
              placeholder="Email"
              containerClassName="mb-3"
              className=" w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
            />
            <InputField
              type="text"
              placeholder="Description"
              containerClassName="mb-3"
              {...register("description")}
              className=" w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="secondary"
          size="large"
          className={classNames(
            formState.isValid
              ? "bg-brand-default text-brand hover:bg-brand-default"
              : "cursor-not-allowed",
            "w-full"
          )}
        >
          Proceed
        </Button>
      </form>
    </FormProvider>
  );
};
