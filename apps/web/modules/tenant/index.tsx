"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Button, Table } from "@vms/ui";
import { useRouter } from "next/navigation";
import { AiOutlineUserDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdForwardToInbox, MdMoreVert } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";
import { TenantTableProps, useGetContact } from "./api/get-tenants";

export const TenantPage = ({ backPath }: { backPath?: string }) => {
  const router = useRouter();

  const tenants = useGetContact({
    filter: { PageNumber: "1", PageSize: "10" },
  });

  console.log("tenants=>", tenants.data);

  return (
    <div>
      <div className=" relative flex items-center justify-center mb-[3.1rem] mt-[5rem]">
        {backPath && (
          <button
            onClick={
              backPath ? () => router.push(backPath) : () => router.back()
            }
            className="inline-block  absolute left-0 underline text-error  text-[16px] font-lato leading-[19.2px]"
          >
            Go Back
          </button>
        )}

        <h3 className="text-center text-default font-bold text-[2.4rem] leading-[3.6rem] ">
          Manage Tenant
        </h3>
      </div>

      <div className="bg-brand-emphasis">
        <div className="flex  py-4 mb-[16px] items-center justify-center gap-12">
          <h3 className="text-[2rem] leading-[3rem] text-default font-semibold">
            Tenant
          </h3>
          <Button
            href="tenants/create?step=1"
            className="w-[26.6rem] border-brand-default text-brand h-[5.6rem] justify-start leading-[2.4rem] font-normal font-lato text-[2rem]"
            prefixIcon={<FaRegUser className="h-2.4rem[] w-[2.4rem]" />}
            variant="danger"
            size="large"
          >
            Add Tenants
          </Button>
        </div>

        <Table<TenantTableProps & { idx: string }>
          isLoading={tenants.isPending}
          columns={[
            {
              title: "#",
              field: "idx",
            },
            {
              title: "Tenant Name",
              field: "name",
            },
            { title: "Tenant Email", field: "email" },
            { title: "Status", field: "status" },
            {
              title: "Action",
              field: "id",
              Cell: ({ entry }) => <MoreMenu />,
            },
          ]}
          data={
            tenants.data?.result.map((item, idx) => {
              return {
                idx: `${idx + 1}`,
                name: item.name,
                status: item?.status,
                id: item.id,
                email: item.email,
              };
            }) ?? []
          }
          rowSelection={() => {}}
        />
      </div>
    </div>
  );
};

const MoreMenu = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="" aria-label="Customise options">
          <MdMoreVert />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className=" space-y-6 min-w-[200px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          side="bottom"
        >
          <DropdownMenu.Item className=" flex  gap-3 group text-[13px] cursor-pointer leading-none text-violet11 rounded-[3px] items-center h-[25px] px-[5px] relative  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            <span>
              <FaRegEdit className="w-[24px] h-[24px] text-error" />
            </span>
            <span className="text-[16px]">Edit Tenant</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item className=" flex  gap-3 group text-[13px] cursor-pointer leading-none text-violet11 rounded-[3px] items-center h-[25px] px-[5px] relative  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            <span>
              <RiDeleteBin6Fill className="w-[24px] h-[24px] text-error" />
            </span>
            <span className="text-[16px]">Delete Tenant</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item className=" flex  gap-3 group text-[13px] cursor-pointer leading-none text-violet11 rounded-[3px] items-center h-[25px] px-[5px] relative  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            <span>
              <MdForwardToInbox className="w-[24px] h-[24px] text-error" />
            </span>
            <span className="text-[16px]">Resend Invite</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item className=" flex  gap-3 group text-[13px] cursor-pointer leading-none text-violet11 rounded-[3px] items-center h-[25px] px-[5px] relative  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            <span>
              <VscEye className="w-[24px] h-[24px] text-error" />
            </span>
            <span className="text-[16px]">View Tenant</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item className=" flex  gap-3 group text-[13px] cursor-pointer leading-none text-violet11 rounded-[3px] items-center h-[25px] px-[5px] relative  select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1">
            <span>
              <AiOutlineUserDelete className="w-[24px] h-[24px] text-error" />
            </span>
            <span className="text-[16px]">Suspend Tenant</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
