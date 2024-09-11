export type Params = {
  [param: string]: string | string[] | undefined;
};

export type SearchParams = {
  [param: string]: string | string[] | undefined;
};

export type PageProps = {
  params: Params;
  searchParams: SearchParams;
};

export type TenantProps = {
  primaryColor: string;
  logo: string;
};

export type LayoutProps = { params: Params; children: React.ReactElement };
