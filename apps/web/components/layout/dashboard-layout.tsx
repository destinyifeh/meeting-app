"use client";

import Shell from "@components/Shell";
import { Params } from "app/_types";

import { ReactNode } from "react";

export const DashboardLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) => {
  return <Shell params={params}>{children}</Shell>;
};
