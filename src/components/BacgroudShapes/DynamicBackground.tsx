import { FC } from "react";
import "./DynamicBackground.scss";

interface Props {
  colors: string[];
}

export const DynamicBackground: FC<Props> = ({ colors }) => {
  return (
    <div className="dynamic-bg">
      <div className="ellipse ellipse-1" style={{ background: colors[0] }} />
      <div className="ellipse ellipse-2" style={{ background: colors[0] }} />
      <div className="ellipse ellipse-3" style={{ background: colors[1] }} />
    </div>
  );
};
