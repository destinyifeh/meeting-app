"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, ReactNode } from "react";
import { FaClipboardList, FaUserFriends } from "react-icons/fa";
import { IoMdChatbubbles, IoMdSettings } from "react-icons/io";

import { Logo } from "@vms/ui";
import { IconType } from "react-icons";

const Shell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-h-screen flex flex-col bg-default">
      <div className="bg-white  h-[var(--navigation-height)] px-4 flex items-center rounded-bl-[25px] rounded-br-[25px]">
        <div className="mr-auto">
          <Link href="/app/dashboard">
            <Logo />
          </Link>
        </div>

        <div>
          <div className="h-[5.4rem] font-bold leading-[21px] text-[14px]  bg-emphasis w-[5.4rem] flex justify-center items-center rounded-full">
            ST
          </div>
        </div>
      </div>

      <div className=" h-[calc(100vh-var(--navigation-height))] ">
        <div className="flex h-full flex-1 gap-4 p-4 ">
          <Sidebar />
          <div className="flex w-0 flex-col flex-1">
            <MainContainer>{children}</MainContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const getDesktopNavigationItems = () => {
  const navigationType = navigation;
  const moreSeparatorIndex = navigationType.findIndex(
    (item) => item.name === MORE_SEPARATOR_NAME
  );

  const {
    desktopNavigationItems,
    mobileNavigationBottomItems,
    mobileNavigationMoreItems,
  } = navigation.reduce<Record<string, NavigationItemType[]>>(
    (items, item, index) => {
      // We filter out the "more" separator in` desktop navigation
      if (item.name !== MORE_SEPARATOR_NAME)
        items?.desktopNavigationItems?.push(item);
      // Items for mobile bottom navigation
      if (index < moreSeparatorIndex + 1 && !item.onlyDesktop) {
        items?.mobileNavigationBottomItems?.push(item);
      } // Items for the "more" menu in mobile navigation
      else {
        items?.mobileNavigationMoreItems?.push(item);
      }
      return items;
    },
    {
      desktopNavigationItems: [],
      mobileNavigationBottomItems: [],
      mobileNavigationMoreItems: [],
    }
  );

  return {
    desktopNavigationItems,
    mobileNavigationBottomItems,
    mobileNavigationMoreItems,
  };
};

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
    <Fragment>
      <Link
        data-test-id={item.name}
        href={item.href}
        aria-label={item.name}
        target={item.target}
        className={classNames(
          "text-default mb-4 group leading-[2.1rem] flex items-center rounded-md  px-2 py-1.5   lg:px-[1.8rem] lg:py-[1.5rem] text-[1.4rem] h-[4rem] font-medium transition hover:bg-brand-muted  hover:text-brand",
          item.child
            ? `[&[aria-current='page']]:!bg-transparent`
            : `[&[aria-current='page']]:bg-brand-muted`,
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
            className=" mr-2 lg:mr-[2.4rem] h-[2.4rem] w-[2.4rem] flex-shrink-0   [&[aria-current='page']]:text-error"
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
    </Fragment>
  );
};

const Navigation = () => {
  const { desktopNavigationItems } = getDesktopNavigationItems();

  return (
    <nav className=" flex flex-col justify-between h-full lg:px-[2rem] lg:py-[1.5rem]">
      <div className="flex flex-col flex-1 ">
        {desktopNavigationItems?.map((item) => (
          <NavigationItem key={item.name} item={item} />
        ))}
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
    <div className="relative bg-white rounded-3xl h-full">
      <aside className="border-muted hidden h-full  w-14 flex-col overflow-y-auto overflow-x-hidden border-r md:sticky md:flex lg:w-[25.6rem] lg:px-3">
        <div className="h-full flex flex-col justify-between">
          <Navigation />
        </div>
      </aside>
    </div>
  );
};

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-default relative z-0 flex-1 bg-white rounded-3xl ">
      <div className="max-w-full px-2 py-4 lg:px-6">
        <div className="flex flex-1 flex-col"></div>
        {children}
      </div>
    </main>
  );
};

export type NavigationItemType = {
  name: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  target?: HTMLAnchorElement["target"];
  icon?: IconType;
  child?: NavigationItemType[];
  pro?: true;
  onlyMobile?: boolean;
  onlyDesktop?: boolean;
  isCurrent?: ({
    item,
    isChild,
    pathname,
  }: {
    item: Pick<NavigationItemType, "href">;
    isChild?: boolean;
    pathname: string | null;
  }) => boolean;
};

const MORE_SEPARATOR_NAME = "more";

const navigation: NavigationItemType[] = [
  {
    name: "Tenant",
    href: "/app/tenants",
    icon: FaUserFriends,
    isCurrent: ({ pathname }) => {
      return pathname?.includes("/tenants") ?? false;
    },
  },
  {
    name: "Audit Log",
    href: "/app/audit",
    icon: FaClipboardList,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/audit") ?? false;
    },
  },
  {
    name: "Admin Reports",
    href: "/app/admin",
    icon: IoMdChatbubbles,
    isCurrent: ({ pathname }) => {
      return pathname?.includes("/admin") ?? false;
    },
  },
];

const bottonNavigation: NavigationItemType[] = [
  {
    name: "Settings",
    href: "/app/settings",
    icon: IoMdSettings,
  },
];

export default Shell;
