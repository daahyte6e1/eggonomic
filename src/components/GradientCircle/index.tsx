import type { FC } from 'react';

type GradientCircleProps = {
  size: number;
  text: string;
  textColor: string;
  colors: string[];
}
export const GradientCircle: FC<GradientCircleProps> = ({size = 200, text = 'Ø', colors, textColor}) => {
  const gradientId = `gradient-${Math.random()}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      {/* Градиент */}
      <defs>
        <radialGradient id={gradientId} cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor={colors[0]} />
          <stop offset='40%' stopColor={colors[1]} />
          <stop offset='70%' stopColor={colors[2]} />
          <stop offset='100%' stopColor={colors[3]} />
        </radialGradient>
      </defs>

      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={`url(#${gradientId})`}
      />

      {/* Текст */}
      <text
        x='50%'
        y='50%'
        textAnchor='middle'
        dominantBaseline='central'
        fontSize='31'
        fill={textColor}
        fontWeight='500'
      >
        {text}
      </text>
    </svg>
  );
};

