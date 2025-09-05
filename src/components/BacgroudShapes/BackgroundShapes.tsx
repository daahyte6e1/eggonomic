import type { FC } from 'react';
import './BackgroundShapes.scss'
type Props = {
  colors: string[],
  className?: string,
}
export const BackgroundShapes: FC<Props> = ({
  colors,
  className = '',
}) => {
  const [c0, c1] = colors;


  return (
    <div
      aria-hidden
      className={`background-shapes ${className}`}
    >
      <svg
        viewBox='0 0 430 932'
        preserveAspectRatio='xMidYMid slice'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0)'>
          <rect width='100%' height='100%' fill='#121212' />

          <g filter='url(#filter0)'>
            <ellipse cx='408.598' cy='312.021' rx='50' ry='185.5' fill={c0} />
          </g>

          <g filter='url(#filter1)'>
            <ellipse
              cx='450.103'
              cy='289.61'
              rx='50'
              ry='185.5'
              transform='rotate(16.1085 450.103 289.61)'
              fill={c0}
            />
          </g>

          <g filter='url(#filter2)'>
            <ellipse
              cx='456.197'
              cy='249.596'
              rx='50'
              ry='185.5'
              transform='rotate(32.217 456.197 249.596)'
              fill={c1}
            />
          </g>

          <g filter='url(#filter3)'>
            <ellipse
              cx='50'
              cy='130.682'
              rx='50'
              ry='130.682'
              transform='matrix(-1 0 0 1 -10.2042 172.636)'
              fill={c0}
            />
          </g>

          <g filter='url(#filter4)'>
            <ellipse
              cx='49.021'
              cy='135.691'
              rx='49.021'
              ry='135.691'
              transform='matrix(-0.979925 0.199368 0.379305 0.925272 -105.141 152.206)'
              fill={c0}
            />
          </g>

          <g filter='url(#filter5)'>
            <ellipse
              cx='46.2827'
              cy='148.338'
              rx='46.2827'
              ry='148.338'
              transform='matrix(-0.913986 0.405746 0.666689 0.745336 -164.396 130)'
              fill={c1}
            />
          </g>
        </g>

        <defs>
          <filter id='filter0' x='25.5981' y='-206.479' width='766' height='1037' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='166.5' result='effect1_foregroundBlur' />
          </filter>

          <filter id='filter1' x='157.701' y='-111.155' width='584.806' height='801.53' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='111' result='effect1_foregroundBlur' />
          </filter>

          <filter id='filter2' x='218.607' y='-39.6167' width='475.18' height='578.425' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='65' result='effect1_foregroundBlur' />
          </filter>

          <filter id='filter3' x='-443.204' y='-160.364' width='766' height='927.364' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='166.5' result='effect1_foregroundBlur' />
          </filter>

          <filter id='filter4' x='-394.112' y='-60.4072' width='584.806' height='695.875' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='111' result='effect1_foregroundBlur' />
          </filter>

          <filter id='filter5' x='-345.393' y='17.1777' width='475.18' height='484.326' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='65' result='effect1_foregroundBlur' />
          </filter>

          <clipPath id='clip0'>
            <rect width='100%' height='100%' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}


