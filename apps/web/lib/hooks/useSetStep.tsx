import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useSetStep = () => {
  const router = useRouter();
  const searchParams = useSearchParams().toString();
  const pathname = usePathname();
  const setStep = (newStep = 1) => {
    const _searchParams = new URLSearchParams(searchParams ?? undefined);
    _searchParams.set("step", newStep.toString());
    router.replace(`${pathname}?${_searchParams.toString()}`);
  };
  return setStep;
};
