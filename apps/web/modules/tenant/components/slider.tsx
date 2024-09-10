import classNames from "classnames";
import React from "react";
import { CgColorPicker } from "react-icons/cg";

export function hslaToHex(
  h: number,
  s: number,
  l: number,
  a: number = 1
): string {
  s /= 100;
  l /= 100;

  const hueToRgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h / 360 + 1 / 3);
    g = hueToRgb(p, q, h / 360);
    b = hueToRgb(p, q, h / 360 - 1 / 3);
  }

  const toHex = (x: number): string => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const alphaHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 1 ? alphaHex : ""}`;
}

export const VerticalColorSlider = ({
  handleMoveSlider,
  thumbnailBackground,
  value,
}: {
  handleMoveSlider: (n: number) => void;
  thumbnailBackground: string;
  value: number;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = e.target.value;
    handleMoveSlider(parseInt(newHue));
  };

  return (
    <div className=" flex flex-col items-center gap-3">
      <style jsx>{`
        #slider_input::-webkit-slider-thumb {
          background-color: ${thumbnailBackground};
          border: 2px solid black;
        }
      `}</style>
      <input
        type="range"
        className={classNames(
          "[writing-mode:vertical-lr] w-3 h-[300px]  bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700",
          "bg-[linear-gradient(to_top,_rgb(255,_0,_0),rgb(255,_255,_0),rgb(0,_255,_0),rgb(0,_255,_255),rgb(0,_0,_255),rgb(255,_0,_255),rgb(255,_0,_0))]",

          //  "[&::-moz-range-thumb]:bg-brand-default",
          "[&::-webkit-slider-thumb]:appearance-none",
          // `[&::-webkit-slider-thumb]:bg-[${thumbnailBackground}]`,
          "[&::-webkit-slider-thumb]:w-[24px]",
          "[&::-webkit-slider-thumb]:h-[12px]",
          "[&::-webkit-slider-thumb]:rounded-full",
          "[&::-webkit-slider-thumb]:border-2",
          "[&::-webkit-slider-thumb]:border-black",
          "[direction:rtl]"
        )}
        value={value}
        id="slider_input"
        onChange={handleChange}
      />

      <CgColorPicker className="w-[24px] h-[24px]" />
    </div>
  );
};
