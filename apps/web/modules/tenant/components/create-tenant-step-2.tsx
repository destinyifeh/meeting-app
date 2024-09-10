import { useMemo, useState } from "react";

import { HslColor, HslColorPicker } from "react-colorful";

import { Button, FileUpload } from "@vms/ui";
import { BsQuestionCircle } from "react-icons/bs";
import "./index.css";
import { hslaToHex, VerticalColorSlider } from "./slider";

export const CreateTenantStepTwo = () => {
  const [image, setImage] = useState<string>();
  return (
    <div>
      <div className="flex gap-[7rem]">
        <div className="w-[40rem] h-[51.2rem] bg-white px-6 py-8 shadow-[4px_4px_5rem_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-center pb-[27px]">
            <h3 className="mr-auto   font-medium text-[1.6rem] leading-[2.4rem] text-default">
              Select Tenant Color
            </h3>
            <span className=" text-[30px] text-default">&times;</span>
          </div>

          <div className="py-[16px]">
            <ColorPickerComponent />
          </div>
        </div>
        <div className=" w-[55.7rem] h-[38.3rem] bg-white px-[4rem] rounded-[12px] py-8 shadow-[4px_4px_5rem_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-center mb-7">
            <h3 className="mr-auto font-medium text-[1.6rem] leading-[2.4rem] text-default">
              Upload logo
            </h3>
            <span className=" text-[30px] text-default">&times;</span>
          </div>

          <div className="mb-[44px]">
            <FileUpload
              accept="any"
              className="h-[18.8rem] w-full rounded-md border-2 border-dashed border-brand-default"
              iconClassName="w-[74px] h-[64px]"
              variant="plain"
              imageSrc={image}
              readFile
              onChange={({ src }) => setImage(src)}
              content={
                <div>
                  <p className="text-[12px] leading-[1.8rem] text-default">
                    Drop your image here, or{" "}
                    <strong className="text-[#1F4690]">browse</strong>
                  </p>
                  <br />
                  <p className="text-[#969DB2] text-[8px] leading-[1.2rem] ">
                    Supports: PNG, JPG, JPEG, WEBP
                  </p>
                </div>
              }
              maxFileSizeMB={2}
            />
          </div>

          <div className="flex items-center justify-between ">
            <div className=" flex gap-2  items-center text-[12px] leading-[22px] font-medium text-[rgba(26,26,26,0.48)]">
              <BsQuestionCircle className="w-[14px] h-[14px]" />
              Help Center
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="border border-[#CECECE] w-[7.2rem] h-[3.2rem] text-[#6D6D6D]"
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="medium"
                className="w-[7.2rem] h-[3.2rem]"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-[3.9rem]">
        <Button
          variant="danger"
          size="large"
          className="w-[320px] text-[16px] leading-[19.2px]"
        >
          Create Tenant
        </Button>
      </div>
    </div>
  );
};
interface Color {
  h: number;
  s: number;
  l: number;
  a: number;
}

const ColorPickerComponent = () => {
  const [hslColor] = useState<string>();
  const [color, setColor] = useState<Color>({ h: 180, s: 100, l: 50, a: 1 });

  const handleColorChange = (newColor: HslColor) => {
    setColor((prev) => ({
      ...prev,
      h: newColor.h,
      s: newColor.s,
      l: newColor.l,
    }));
  };

  const handleMoveSlider = (value: number) => {
    const _color = {
      h: value * 3.6,
      s: color.s,
      l: color.l,
      a: color.a,
    };

    setColor(_color);
  };

  const hexColor = hslaToHex(color.h, color.s, color.l);

  const currentColor = useMemo(
    () => hslaToHex(color.h, color.s, color.l),
    [color, hslColor]
  );

  return (
    <div className="w-full h-full">
      <section className="custom-layout example ">
        <HslColorPicker color={color} onChange={handleColorChange} />
        <VerticalColorSlider
          handleMoveSlider={handleMoveSlider}
          thumbnailBackground={hexColor}
          value={color.h / 3.6}
        />
      </section>

      <div className="flex items-center gap-[20px] py-[16px]">
        <span className="text-dark font-lato font-bold text-[16px] leading-[19.2px]">
          Hex
        </span>
        <span
          style={{
            backgroundColor: currentColor,
            display: "inline-block",
            borderRadius: "4px",
          }}
          className="w-[32px] h-[32px]"
        ></span>
      </div>
    </div>
  );
};

export default ColorPickerComponent;
