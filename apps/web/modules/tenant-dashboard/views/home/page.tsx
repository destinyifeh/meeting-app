"use client";

import { Button } from "@vms/ui";
import { useState } from "react";
import { MdEvent } from "react-icons/md";
import { EventModal } from "~/tenant-dashboard/components/event-modal";

export const TenantHomePage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="text-center my-10">
        <h2 className="leading-[30px] text-brand font-bold text-[20px] mb-[1.3rem]">
          Tropical General Investments Group’s Dashboard
        </h2>
      </div>
      <div className="flex justify-center items-center bg-[#FFF27D] p-5 h-[196px]">
        <Button
          onClick={onOpenChange}
          type="button"
          size="large"
          prefixIcon={<MdEvent width={24} height={24} />}
          className="w-[266px] border-width-[0.5px] rounded-[5px] border-[#F5D500] bg-[#F5D500] text-black-500 hover:bg-[#F5D500] 
          active:bg-[#F5D500]-700 text-[15px] flex justify-start items-center space-x-2 focus:outline-none focus:ring-0 "
        >
          Add Event
        </Button>
      </div>

      <EventModal onOpenChange={onOpenChange} open={open} onClose={onClose} />
    </div>
  );
};
