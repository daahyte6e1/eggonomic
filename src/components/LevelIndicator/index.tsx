import type { FC } from "react";

type LevelIndicatorProps = {
  colors: string[];
  number: number;
  numberColor: string;
};

export const LevelIndicator: FC<LevelIndicatorProps> = ({
  colors = [],
  number = 1,
  numberColor = "black",
}) => {
  // дефолтные цвета, если массив меньше 6 элементов

  return (
    <svg
      width='100'
      height='100'
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="0"
        width="98"
        height="98"
      >
        <path d="M43.753 95.0024L15.1358 72.1086C13.426 70.7408 12.2124 68.8496 11.6813 66.7253L2.11707 28.4683C0.904222 23.6169 3.46155 18.6154 8.10459 16.7582L46.2861 1.48556C48.6702 0.531917 51.3298 0.531919 53.7139 1.48556L91.8954 16.7582C96.5385 18.6154 99.0958 23.6169 97.8829 28.4683L88.3187 66.7253C87.7876 68.8496 86.574 70.7408 84.8642 72.1086L56.2469 95.0024C52.5948 97.9242 47.4052 97.9242 43.753 95.0024Z" fill="white"/>
      </mask>
      <g mask="url(#mask0)">
        <path d="M43.753 95.0024L15.1358 72.1086C13.426 70.7408 12.2124 68.8496 11.6813 66.7253L2.11707 28.4683C0.904222 23.6169 3.46155 18.6154 8.10459 16.7582L46.2861 1.48556C48.6702 0.531917 51.3298 0.531919 53.7139 1.48556L91.8954 16.7582C96.5385 18.6154 99.0958 23.6169 97.8829 28.4683L88.3187 66.7253C87.7876 68.8496 86.574 70.7408 84.8642 72.1086L56.2469 95.0024C52.5948 97.9242 47.4052 97.9242 43.753 95.0024Z" fill="white"/>

        {/* Эллипсы с динамическими цветами */}
        <g filter="url(#filter0)">
          <ellipse cx="25.0278" cy="92.8531" rx="25.0278" ry="92.8531" transform="matrix(-0.877995 -0.478669 -0.478669 0.877995 112.84 35.3175)" fill={colors[0]} />
        </g>
        <g filter="url(#filter1)">
          <ellipse cx="31.4719" cy="106.912" rx="25.0278" ry="92.8531" transform="rotate(16.1085 31.4719 106.912)" fill={colors[1]} />
        </g>
        <g filter="url(#filter2)">
          <ellipse cx="25.0278" cy="92.8531" rx="25.0278" ry="92.8531" transform="matrix(-0.976334 -0.216269 -0.216269 0.976334 78.0654 -0.174438)" fill={colors[2]} />
        </g>
        <g filter="url(#filter3)">
          <ellipse cx="93.341" cy="107.66" rx="25.0278" ry="92.8531" transform="rotate(32.217 93.341 107.66)" fill={colors[3]} />
        </g>
        <g filter="url(#filter4)">
          <ellipse cx="25.0278" cy="92.8531" rx="25.0278" ry="92.8531" transform="matrix(-0.998006 0.0631133 0.0631133 0.998006 46.4111 -10.345)" fill={colors[4]} />
        </g>
        <g filter="url(#filter5)">
          <ellipse cx="56.6918" cy="106.613" rx="25.0278" ry="92.8531" fill={colors[5]} />
        </g>

        {/* Цифра по центру */}
        {number !== undefined && (
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="28"
            fontWeight="bold"
            fill={numberColor}
          >
            {number}
          </text>
        )}
      </g>

      {/* Фильтры */}
      <defs>
        <filter id="filter0" x="-38.1722" y="-12.549" width="169.185" height="234.822" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="17.5" />
        </filter>
        <filter id="filter1" x="-38.7687" y="-17.5702" width="140.481" height="248.964" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="17.5" />
        </filter>
        <filter id="filter2" x="-43.0804" y="-50.7515" width="153.258" height="271.64" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="22.5" />
        </filter>
        <filter id="filter3" x="14.4861" y="2.96521" width="157.71" height="209.389" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="12.5" />
        </filter>
        <filter id="filter4" x="-33.3684" y="-43.7792" width="121.324" height="255.363" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="17.5" />
        </filter>
        <filter id="filter5" x="-3.33594" y="-21.24" width="120.056" height="255.706" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="17.5" />
        </filter>
      </defs>
    </svg>
  );
};