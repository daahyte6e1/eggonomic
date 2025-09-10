import type { FC } from 'react';
import './BackgroundShapes.scss';

type Props = {
  colors: string[];
  className?: string;
};

export const BackgroundShapes: FC<Props> = ({
  colors,
  className = '',
}) => {
  const [c0, c1] = colors;

  return (
    <div
      className={`background-shapes ${className}`}
      style={
        {
          "--c0": c0,
          "--c1": c1,
        } as React.CSSProperties
      }
    >
      <div className="shape shape-1" />
      <div className="shape shape-2" />
      <div className="shape shape-3" />
      <div className="shape shape-4" />
      <div className="shape shape-5" />
      <div className="shape shape-6" />
    </div>
  );
};
