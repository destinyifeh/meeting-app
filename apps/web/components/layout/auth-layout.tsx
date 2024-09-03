"use client";

import { Logo } from "@vms/ui";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-screen relative">
      <div className="w-full h-full flex ">
        <div className=" relative h-full  flex-col flex w-[64rem] shrink-0">
          <Image
            alt="vms-auth-landing"
            src="/vmsland.webp"
            fill
            style={{
              objectFit: "fill",
              height: "100%",
            }}
            priority
          />
        </div>

        <div className="w-0 flex-1 flex flex-col pt-[9.1rem] items-center bg-white">
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
