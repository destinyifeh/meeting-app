"use client";

import Shell from "@components/Shell";

import { ReactNode } from "react";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return <Shell>{children}</Shell>;
};
