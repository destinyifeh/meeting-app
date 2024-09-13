import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { deleteCookie } from "@vms/lib";
import { useRouter } from "next/navigation";

export const UserDropDown = () => {
  const router = useRouter();
  const logoutHandler = () => {
    deleteCookie("accessToken");
    deleteCookie("rememberMe");
    deleteCookie("role");

    router.replace("/auth/login");
  };
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="h-[5.4rem] cursor-pointer font-bold leading-[21px] text-[14px]  bg-emphasis w-[5.4rem] flex justify-center items-center rounded-full">
          ST
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <DropdownMenu.Item
            onClick={logoutHandler}
            className="group text-[13px]  cursor-pointer leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
