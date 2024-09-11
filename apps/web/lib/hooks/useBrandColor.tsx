import useGetBrandingColours from "@lib/getBrandingColors";
import { useVmsTheme } from "./useVmsTheme";

export const useBrandColors = ({
  brandColor,
}: {
  brandColor?: string | null | undefined;
}) => {
  const brandTheme = useGetBrandingColours({
    lightVal: brandColor,
  });

  useVmsTheme(brandTheme);
};
