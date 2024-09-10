"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputField } from "@vms/ui";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(4, "Full name must be at least 4 characters long"),
});

type FormValue = {
  fullName: string;
};
export const ProfileUpdateForm: React.FC = () => {
  const [editProfile, setEditProfile] = React.useState<boolean>(false);
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

  const fullName = watch("fullName", "");

  const onSubmit = async (data: FormValue) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form
        className="flex w-[32rem] md:w-[50%] flex-col "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <div className="flex flex-col sm:space-y-4 md:flex-row md:space-x-4 md:items-center md:space-y-0">
            <InputField
              type="text"
              label="Full Name"
              defaultValue="Elon Musk"
              placeholder="Elon Musk"
              className="w-full p-4 rounded-lg text-brand  h-[4.5rem] placeholder:text-[14px] text-[16px]"
              {...register("fullName")}
              disabled={!editProfile}
            />
            <InputField
              type="text"
              label="Email"
              placeholder=""
              className="w-full p-4 rounded-lg text-brand  h-[4.5rem] placeholder:text-[14px] text-[16px] bg-gray-100"
              value="elonmusk@org.com"
              disabled
            />
          </div>
        </div>

        <Button
          onClick={() => setEditProfile(true)}
          type={editProfile ? "submit" : "button"}
          variant={editProfile ? "danger" : null}
          size="large"
          className={
            editProfile
              ? "w-[175px]"
              : "w-[175px] border-width-[0.5px] border-red-500 bg-white text-red-500 hover:bg-white active:bg-white-700 text-[15px]"
          }
        >
          {editProfile ? "Save Changes" : " Edit Profile"}
        </Button>
      </form>
    </FormProvider>
  );
};
