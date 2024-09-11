import { AuthLayout } from "@components/layout/auth-layout";
import { LayoutProps, TenantProps } from "app/_types";

const fetchAPi = (tenant: string): Promise<TenantProps> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        logo: "https://res.cloudinary.com/solomonfrank/image/upload/v1655940333/apems/Apems-logo_iu3uju.webp",
        primaryColor: "#F5D500",
      });
    }, 1000);
  });
};

const Layout = async ({ children, params }: LayoutProps) => {
  const hostname = params?.domain as string;
  const tenantName = hostname.replace(".localhost:3000", "");
  const response = await fetchAPi(tenantName);
  return (
    <AuthLayout tenant={response} params={params}>
      {children}
    </AuthLayout>
  );
};

export default Layout;
