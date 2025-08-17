import type { FC } from "react";

interface LevelBackgroundProps {
  colors: string[];
}

const LevelBackground: FC<LevelBackgroundProps> = ({
  colors,
}) => {
  return (
    <svg
      width='430'
      height='430'
      viewBox="0 0 430 475"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_3_908)">
        <ellipse
          cx="36.7957"
          cy="122.931"
          rx="36.7957"
          ry="122.931"
          transform="matrix(0.757196 0.653188 -0.418143 0.908381 283.065 54.4958)"
          fill={colors[0]}
        />
      </g>
      <g filter="url(#filter1_f_3_908)">
        <ellipse
          cx="26.0336"
          cy="131.867"
          rx="26.0336"
          ry="131.867"
          transform="matrix(-0.996274 0.0862488 0.0461464 0.998935 199.378 4.25348)"
          fill={colors[1]}
        />
      </g>
      <g filter="url(#filter2_f_3_908)">
        <ellipse
          cx="32.4914"
          cy="110.394"
          rx="32.4914"
          ry="110.394"
          transform="matrix(0.477089 -0.878855 0.701011 0.71315 65 61.8541)"
          fill={colors[2]}
        />
      </g>
      <g filter="url(#filter3_f_3_908)">
        <ellipse
          cx="32.4914"
          cy="110.394"
          rx="32.4914"
          ry="110.394"
          transform="matrix(-0.477089 -0.878855 -0.701011 0.71315 365 39.1104)"
          fill={colors[3]}
        />
      </g>
      <defs>
        <filter
          id="filter0_f_3_908"
          x="31.0454"
          y="-94.0507"
          width="456.958"
          height="568.498"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="85"
            result="effect1_foregroundBlur_3_908"
          />
        </filter>
        <filter
          id="filter1_f_3_908"
          x="2.87994"
          y="-143.521"
          width="353.294"
          height="563.492"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="75"
            result="effect1_foregroundBlur_3_908"
          />
        </filter>
        <filter
          id="filter2_f_3_908"
          x="-20.0512"
          y="-70.7426"
          width="355.88"
          height="365.539"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="49.5"
            result="effect1_foregroundBlur_3_908"
          />
        </filter>
        <filter
          id="filter3_f_3_908"
          x="94.1708"
          y="-93.4863"
          width="355.88"
          height="365.539"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="49.5"
            result="effect1_foregroundBlur_3_908"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default LevelBackground;
