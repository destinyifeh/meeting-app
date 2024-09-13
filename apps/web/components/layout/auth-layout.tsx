"use client";

import { useBrandColors } from "@lib/hooks/useBrandColor";
import { Logo } from "@vms/ui";
import { Params, TenantProps } from "app/_types";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export const AuthLayout = ({
  children,
  params,
  tenant,
}: {
  children: ReactNode;
  params: Params;
  tenant?: TenantProps;
}) => {
  const hostname = params?.domain as string;
  const tenantName = hostname.replace(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    ""
  );
  useBrandColors({
    brandColor: "",
  });
  return (
    <div className="h-screen w-screen relative">
      <div className="w-full h-full flex ">
        <div className="relative h-full hidden md:sticky  flex-col md:flex md:min-w-[64rem] xl:min-w-[40vw] ">
          <Image
            alt="vms-auth-landing"
            src={"/vmsland.webp"}
            // style={{
            //   position: "absolute",
            //   left: 0,
            //   top: 0,
            //   width: "100%",
            //   height: "100%",
            //   objectFit: "cover",
            // }}
            priority
            fill
            sizes="(min-width: 808px) 50vw, 100vw"
            style={{
              objectFit: "cover", // cover, contain, none
            }}
          />
        </div>

        <div className="w-0 flex-1 flex flex-col pt-[9.1rem] items-center bg-white text-brand">
          <div className="mb-[7.8rem]">
            <Link href="/auth/login">
              <Logo />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
