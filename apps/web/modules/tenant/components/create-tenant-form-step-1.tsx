"use client";
import { useSetStep } from "@lib/hooks/useSetStep";
import { Button, InputField } from "@vms/ui";

export const CreateTenantStepOne = () => {
  const setpStep = useSetStep();

  return (
    <form className="w-full block mb-[1.6rem]">
      <div className="mb-6">
        <div className="space-y-4">
          <InputField
            type="text"
            placeholder="Tenant Name"
            containerClassName="mb-3"
            className=" w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
          />
          <InputField
            type="email"
            placeholder="Email"
            containerClassName="mb-3"
            className=" w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
          />
          <InputField
            type="text"
            placeholder="Description"
            containerClassName="mb-3"
            className=" w-full p-4 rounded-lg  h-[4.5rem] placeholder:text-[14px] text-[16px]"
          />
        </div>
      </div>

      <Button
        onClick={() => setpStep(2)}
        type="button"
        variant="secondary"
        size="large"
        className="w-full"
      >
        Proceed
      </Button>
    </form>
  );
};
