import React from "react";
import "./CellSvg.css";

const CellSvg = ({ cx, cy, r, stroke, strokeWidth, fill }) => {
  return (
    <circle
      className="cell"
      cx={cx}
      cy={cy}
      r={r}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  );
};

export default CellSvg;
