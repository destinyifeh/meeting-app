import { AuthLayout } from "@components/layout/auth-layout";
import { LayoutProps } from "app/_types";

const Layout = ({ children }: LayoutProps) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
