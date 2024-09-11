const BRAND_COLOR = "#ED1C24";

type Rgb = {
  r: number;
  g: number;
  b: number;
};

export function fallBackHex(val: string | null, dark: boolean): string {
  if (val && isValidHexCode(val)) {
    return val;
  }
  return BRAND_COLOR;
}

export function isValidHexCode(hexColor: string): boolean {
  // Regular expression for hex color code pattern
  const hexColorPattern = /^#([0-9A-Fa-f]{3}){1,2}$/;

  // Check if hex color code matches pattern
  const isHexColor = hexColorPattern.test(hexColor);

  return isHexColor;
}

function hexToRgb(hex: string): Rgb {
  const sanitizedHex = hex.replace("##", "#");
  const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    sanitizedHex
  );

  if (!colorParts) {
    throw new Error("Invalid Hex colour");
  }

  const [, r, g, b] = colorParts;

  return {
    r: parseInt(r as string, 16),
    g: parseInt(g as string, 16),
    b: parseInt(b as string, 16),
  } as Rgb;
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lighten(hex: string, intensity: number): string {
  const color = hexToRgb(`#${hex}`);

  if (!color) {
    return "";
  }

  const r = Math.round(color.r + (255 - color.r) * intensity);
  const g = Math.round(color.g + (255 - color.g) * intensity);
  const b = Math.round(color.b + (255 - color.b) * intensity);

  return rgbToHex(r, g, b);
}

function darken(hex: string, intensity: number): string {
  const color = hexToRgb(hex);

  if (!color) {
    return "";
  }

  const r = Math.round(color.r * intensity);
  const g = Math.round(color.g * intensity);
  const b = Math.round(color.b * intensity);

  return rgbToHex(r, g, b);
}

function normalizeHexCode(hex: string | null, dark: boolean) {
  if (!hex) {
    return BRAND_COLOR;
  }

  hex = hex.replace("#", "");

  // If the length of the hex code is 3, double up each character
  // e.g. fff => ffffff or a0e => aa00ee
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  return hex;
}

export const createColorMap = (brandColor: string) => {
  const response: Record<string, string> = {
    500: `#${brandColor}`.replace("##", "#"),
  };
  const intensityMap: {
    [key: number]: number;
  } = {
    50: 0.95,
    100: 0.9,
    200: 0.75,
    300: 0.6,
    400: 0.3,
    600: 0.9,
    700: 0.75,
    800: 0.6,
    900: 0.49,
  };

  [50, 100, 200, 300, 400].forEach((level) => {
    response[level] = lighten(brandColor, intensityMap[level] as number);
  });

  [600, 700, 800, 900].forEach((level) => {
    response[level] = darken(brandColor, intensityMap[level] as number);
  });
  return response;
};

function getWCAGContrastColor(background: string): string {
  // Convert the hex background color to RGB
  const { r, g, b } = hexToRgb(background);
  // Calculate the luminance of the background color
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // If the luminance is less than 0.5, use white as the text color, otherwise use black
  return luminance < 0.5 ? "#FFFFFF" : "#000000";
}

export function checkWCAGContrastColor(background: string, target: string) {
  const backgroundRGB = hexToRgb(background);
  const targetRGB = hexToRgb(target);
  const bgLuminance =
    (0.2126 * backgroundRGB.r +
      0.7152 * backgroundRGB.g +
      0.0722 * backgroundRGB.b) /
    255;
  const targetLuminance =
    (0.2126 * targetRGB.r + 0.7152 * targetRGB.g + 0.0722 * targetRGB.b) / 255;

  const contrastRadio =
    (Math.max(bgLuminance, targetLuminance) + 0.05) /
    (Math.min(targetLuminance, bgLuminance) + 0.05);

  const MIN_CONTRAST_RATIO = 4.5; // used for BGs

  return contrastRadio >= MIN_CONTRAST_RATIO;
}

/**
 * Given brand color value, update the css variables
 * within the document to reflect the new brand colors.
 */
const useGetBrandingColours = ({
  lightVal,
}: {
  lightVal: string | undefined | null;
}) => {
  let brandColor = lightVal ? lightVal : BRAND_COLOR;
  const constrastWeight = lightVal ? 300 : 100;
  brandColor = normalizeHexCode(brandColor, false);
  const lightColourMap = createColorMap(brandColor);

  const theme = {
    root: {
      "vms-brand": lightColourMap["500"] as string,
      "vms-brand-sidebar": lightVal
        ? (lightColourMap["500"] as string)
        : getWCAGContrastColor(lightColourMap["500"] as string),
      "vms-brand-emphasis": lightVal
        ? (lightColourMap[300] as string)
        : "#FFF5F6",
      "vms-brand-subtle": lightColourMap["200"] as string,
      "vms-brand-text": getWCAGContrastColor(lightColourMap["500"] as string),
      "vms-brand-accent": getWCAGContrastColor(lightColourMap["500"] as string),
    },
  };

  return theme;
};

export default useGetBrandingColours;
