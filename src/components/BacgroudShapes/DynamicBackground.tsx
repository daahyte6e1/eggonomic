import {FC} from "react";

interface Props {
  colors: string[]
}
export const DynamicBackground: FC<Props> = ({colors}) => {
  const [c0, c1] = colors
  return (
    <svg 
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: -1,
        borderRadius: '20px'
      }} 
      viewBox="0 0 392 447" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      preserveAspectRatio="xMidYMid slice"
    >
      <g clipPath="url(#clip0_188_59)">
        <rect width="100%" height="100%" fill="white" fillOpacity="0.1"/>
        <g filter="url(#filter0_f_188_59)">
          <ellipse cx="210.598" cy="-34.9795" rx="50" ry="185.5" fill={c0}/>
        </g>
        <g filter="url(#filter1_f_188_59)">
          <ellipse cx="252.103" cy="-57.3897" rx="50" ry="185.5" transform="rotate(16.1085 252.103 -57.3897)" fill={c0}/>
        </g>
        <g filter="url(#filter2_f_188_59)">
          <ellipse cx="258.197" cy="-97.4042" rx="50" ry="185.5" transform="rotate(32.217 258.197 -97.4042)" fill={c1}/>
        </g>
      </g>
      <rect x="0.3" y="0.3" width="100%" height="100%" stroke="white" strokeOpacity="0.07" strokeWidth="0.6"/>
      <defs>
        <filter id="filter0_f_188_59" x="-172.402" y="-553.479" width="766" height="1037" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="166.5" result="effect1_foregroundBlur_188_59"/>
        </filter>
        <filter id="filter1_f_188_59" x="-40.2995" y="-458.155" width="584.806" height="801.53" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="111" result="effect1_foregroundBlur_188_59"/>
        </filter>
        <filter id="filter2_f_188_59" x="20.6068" y="-386.617" width="475.18" height="578.425" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="65" result="effect1_foregroundBlur_188_59"/>
        </filter>
        <clipPath id="clip0_188_59">
          <rect width="392" height="447" rx="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>

  );
};

