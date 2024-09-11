"use client";
import { Button, Table } from "@vms/ui";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";
import { useGetContact } from "./api/get-tenants";

export const TenantPage = ({ backPath }: { backPath?: string }) => {
  const router = useRouter();

  const tenants = useGetContact({
    filter: { PageNumber: "1", PageSize: "10" },
  });

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

        <Table
          columns={[
            {
              title: "#",
              field: "id",
            },
            {
              title: "Tenant Name",
              field: "title",
            },
            { title: "Tenant ID", field: "title" },
            { title: "Status", field: "address" },
            { title: "Action", field: "age" },
          ]}
          data={[
            {
              id: "1",
              title: "solomon",
              address: "solomon@gmail.com",
              age: 3,
            },
            {
              id: "1",
              title: "solomon",
              address: "solomon@gmail.com",
              age: 3,
            },
            {
              id: "1",
              title: "solomon",
              address: "solomon@gmail.com",
              age: 3,
            },
            {
              id: "1",
              title: "solomon",
              address: "solomon@gmail.com",
              age: 3,
            },
            {
              id: "1",
              title: "solomon",
              address: "solomon@gmail.com",
              age: 3,
            },
          ]}
          rowSelection={() => {}}
        />
      </div>
    </div>
  );
};
