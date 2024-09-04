export const Logo = ({ className, ...props }: JSX.IntrinsicElements["svg"]) => {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      {...props}
    >
      <rect width="60" height="60" fill="url(#pattern0_772_2968)" />
      <defs>
        <pattern
          id="pattern0_772_2968"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_772_2968" transform="scale(0.0166667)" />
        </pattern>
        <image
          id="image0_772_2968"
          width="60"
          height="60"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
