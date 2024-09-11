"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createTenantinInput } from "./api/create-tenant";
import { CreateTenantStepOne } from "./components/create-tenant-form-step-1";
import { CreateTenantStepTwo } from "./components/create-tenant-step-2";

export const CreateTenantPage = ({ backPath }: { backPath?: string }) => {
  const router = useRouter();
  const _searchParams = useSearchParams();
  const searchParams = new URLSearchParams(_searchParams.toString());

  const [stepOnePayload, setStepOnePayload] = useState<createTenantinInput>();

  return (
    <div>
      <div className=" relative flex items-center justify-center mb-[3.1rem] mt-[5rem]">
        {backPath && (
          <button
            onClick={() => router.back()}
            className="inline-block  absolute left-0 underline text-error  text-[16px] font-lato leading-[19.2px]"
          >
            Go Back
          </button>
        )}

        <h3 className="text-center text-default font-bold text-[2.4rem] leading-[3.6rem] ">
          Create New Tenant
        </h3>
      </div>

      {searchParams.get("step") === "2" && (
        <div>
          <CreateTenantStepTwo stepOnePayload={stepOnePayload} />
        </div>
      )}

      {searchParams.get("step") === "1" && (
        <div className="w-[37.2rem] mx-auto flex flex-col justify-center items-center mt-[124px]">
          <CreateTenantStepOne
            nextHandler={(payload) => setStepOnePayload(payload)}
          />
        </div>
      )}
    </div>
  );
};
