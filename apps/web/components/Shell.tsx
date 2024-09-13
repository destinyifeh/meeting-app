"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, Fragment, ReactElement, ReactNode } from "react";
import { FaClipboardList, FaUserFriends } from "react-icons/fa";
import { IoMdChatbubbles, IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

import { ROLES, useAuthorization } from "@lib/hooks/useAuthorization";
import { useBrandColors } from "@lib/hooks/useBrandColor";
import { Logo } from "@vms/ui";
import { Params } from "app/_types";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import { UserDropDown } from "./user-dropdown";

const ADMIN_NAVIGATION: NavigationItemType[] = [
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
    name: "Admin Report",
    href: "/app/admin",
    icon: IoMdChatbubbles,
    isCurrent: ({ pathname }) => {
      return pathname?.includes("/admin") ?? false;
    },
  },
];

const TENANT_NAVIGATION: NavigationItemType[] = [
  {
    name: "Dashboard",
    href: "/app/dashboard",
    icon: MdDashboard,
    isCurrent: ({ pathname }) => {
      return pathname?.includes("/dashboard") ?? false;
    },
  },
  {
    name: "Notification",
    href: "/app/notification",
    icon: FaClipboardList,

    isCurrent: ({ pathname }) => {
      return pathname?.includes("/notification") ?? false;
    },
  },
];

const Shell = ({
  children,
  backPath,
  sidebarContainer,
  navigation = ADMIN_NAVIGATION,
  params,
  role,
}: {
  children: ReactNode;
  backPath?: string;
  sidebarContainer?: ReactElement;
  navigation?: NavigationItemType[];
  params: Params;
  role: ROLES;
}) => {
  const router = useRouter();
  const { checkAccess } = useAuthorization();
  const roleNavigation = checkAccess({ allowedRoles: [ROLES.SUPERADMIN] });

  navigation = roleNavigation ? ADMIN_NAVIGATION : TENANT_NAVIGATION;

  const hostname = params?.domain as string;
  const tenantName = hostname.replace(
    `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    ""
  );
  useBrandColors({
    brandColor: "",
  });

  return (
    <div className="max-h-screen flex flex-col bg-default">
      <div className="bg-white h-[var(--navigation-height)] px-4 flex items-center rounded-bl-[25px] rounded-br-[25px]">
        <div
          className={classNames(
            "mr-auto",
            !tenantName.startsWith("localhost") && "invisible"
          )}
        >
          <Link href="/app/dashboard">
            <Logo />
          </Link>
        </div>

        <div>
          {/* <div className="h-[5.4rem] font-bold leading-[21px] text-[14px]  bg-emphasis w-[5.4rem] flex justify-center items-center rounded-full">
            ST
          </div> */}

          <UserDropDown />
        </div>
      </div>

      <div className=" h-[calc(100vh-var(--navigation-height))] ">
        <div className="flex h-full flex-1 gap-4 p-4 ">
          {sidebarContainer ? (
            cloneElement(sidebarContainer, { isCustom: true })
          ) : (
            <Sidebar navigation={navigation} />
          )}

          <div className="flex w-0 flex-col flex-1 h-full overflow-y-auto vms-scrollbar ">
            <MainContainer>
              <div className=" w-[90%] mx-auto h-full ">{children}</div>
            </MainContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const getDesktopNavigationItems = (navigation: NavigationItemType[]) => {
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
  const brandColor = "yu";
  return (
    <Fragment>
      <Link
        data-test-id={item.name}
        href={item.href}
        aria-label={item.name}
        target={item.target}
        className={classNames(
          "text-default mb-4 group leading-[2.1rem] flex items-center rounded-md  px-2 py-1.5   lg:px-[1.8rem] lg:py-[1.5rem] text-[1.4rem] h-[4rem] font-medium transition hover:bg-brand-subtle  hover:text-black",
          item.child
            ? `[&[aria-current='page']]:!bg-transparent`
            : `[&[aria-current='page']]:bg-brand-subtle `,
          isChild
            ? `[&[aria-current='page']]:bg-brand-subtle hidden h-8 pl-16 lg:flex lg:pl-11 ${
                props.index === 0 ? "mt-0" : "mt-px"
              }`
            : "[&[aria-current='page']]:text-default mt-0.5"
        )}
        aria-current={current ? "page" : undefined}
      >
        {item.icon && (
          <item.icon
            className={classNames(
              `mr-2 lg:mr-[2.4rem] h-[2.4rem] w-[2.4rem] flex-shrink-0`,
              brandColor
                ? "[&[aria-current='page']]:text-brand"
                : "[&[aria-current='page']]:text-error"
            )}
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

const Navigation = ({ navigation }: { navigation: NavigationItemType[] }) => {
  const { desktopNavigationItems } = getDesktopNavigationItems(navigation);

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

const Sidebar = ({ navigation }: { navigation: NavigationItemType[] }) => {
  return (
    <div className="relative bg-brand-sidebar rounded-3xl h-full">
      <aside className="border-muted hidden h-full  w-14 flex-col overflow-y-auto overflow-x-hidden border-r md:sticky md:flex lg:w-[25.6rem] lg:px-3">
        <div className="h-full flex flex-col justify-between">
          {/* <div className="mt-4 flex items-center justify-center">
            <Link href="/app/dashboard">
              <Logo />
            </Link>
          </div> */}
          <Navigation navigation={navigation} />
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

const bottonNavigation: NavigationItemType[] = [
  {
    name: "Settings",
    href: "/app/settings",
    icon: IoMdSettings,
  },
];

export default Shell;
