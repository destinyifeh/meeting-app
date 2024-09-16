"use client";

import Shell, { NavigationItemType } from "@components/Shell";
import { Logo } from "@vms/ui";
import { Params } from "app/_types";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ReactNode } from "react";
import { FaBell } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

export const TenantDashboardLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) => {
  const ADMIN_NAVIGATION: NavigationItemType[] = [
    {
      name: "Dashboard",
      href: "/tenant-dashboard/home",
      icon: MdDashboard,
      isCurrent: ({ pathname }) => {
        return pathname?.includes("/home") ?? false;
      },
    },
    {
      name: "Notification",
      href: "/tenant-dashboard/notification",
      icon: FaBell,

      isCurrent: ({ pathname }) => {
        return pathname?.includes("/notification") ?? false;
      },
    },
  ];

  const bottonNavigation: NavigationItemType[] = [
    {
      name: "Settings",
      href: "/tenant-dashboard/settings",
      icon: IoMdSettings,
    },
  ];

  const defaultIsCurrent: NavigationItemType["isCurrent"] = ({
    isChild,
    item,
    pathname,
  }) => {
    return isChild
      ? item.href === pathname
      : item.href
        ? (pathname?.startsWith(item.href) ?? false)
        : false;
  };

  const NavigationItem: React.FC<{
    index?: number;
    item: NavigationItemType;
    isChild?: boolean;
  }> = (props) => {
    const { item, isChild } = props;
    const pathname = usePathname();
    const isCurrent: NavigationItemType["isCurrent"] =
      item.isCurrent || defaultIsCurrent;
    const current = isCurrent({ isChild: !!isChild, item, pathname });

    return (
      <Link
        data-test-id={item.name}
        href={item.href}
        aria-label={item.name}
        target={item.target}
        className={classNames(
          "text-default mb-4 group leading-[2.1rem] flex items-center rounded-md  px-2 py-1.5   lg:px-[1.8rem] lg:py-[1.5rem] text-[1.4rem] h-[4rem] font-medium transition hover:bg-brand-muted  hover:text-brand",
          item.child
            ? `[&[aria-current='page']]:!bg-transparent`
            : `[&[aria-current='page']]:bg-[#FFF27D]`,
          isChild
            ? `[&[aria-current='page']]:text-emphasis [&[aria-current='page']]:bg-emphasis hidden h-8 pl-16 lg:flex lg:pl-11 ${
                props.index === 0 ? "mt-0" : "mt-px"
              }`
            : "[&[aria-current='page']]:text-default mt-0.5"
        )}
        aria-current={current ? "page" : undefined}
      >
        {item.icon && (
          <item.icon
            className=" mr-2 lg:mr-[2.4rem] h-[2.4rem] w-[2.4rem] flex-shrink-0   [&[aria-current='page']]:text-black"
            aria-hidden="true"
            aria-current={current ? "page" : undefined}
          />
        )}

        <span
          className="hidden w-full justify-between truncate text-ellipsis lg:flex"
          data-testid={`${item.name}-test`}
        >
          {item.name}
        </span>
      </Link>
    );
  };

  const Navigation = () => {
    return (
      <nav className=" flex flex-col justify-between h-full lg:px-[2rem] lg:py-[1.5rem]">
        <div className="flex flex-col flex-1 ">
          {ADMIN_NAVIGATION.map((item, index) => {
            return <NavigationItem key={item.name} item={item} index={index} />;
          })}
        </div>
        <div className="flex flex-col ">
          {bottonNavigation?.map((item) => (
            <NavigationItem key={item.name} item={item} />
          ))}
        </div>
      </nav>
    );
  };
  const Sidebar = () => {
    return (
      <div className="relative bg-[#F5D500] rounded-3xl h-full">
        <aside className="border-muted hidden h-full  w-14 flex-col overflow-y-auto overflow-x-hidden border-r md:sticky md:flex lg:w-[25.6rem] lg:px-3">
          <div className="h-full flex flex-col justify-between">
            {/* <p>Tenant logo here</p> */}
            <div className="mt-4 flex items-center justify-center">
              <Link href="/tenant-dashboard/home">
                <Logo />
              </Link>
            </div>
            {/* <p>Logo div end</p> */}
            <Navigation />
          </div>
        </aside>
      </div>
    );
  };
  return (
    <Shell params={params} sidebarContainer={<Sidebar />}>
      {" "}
      {children}
    </Shell>
  );
};
