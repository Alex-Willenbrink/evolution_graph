import React from "react";

const CellSvg = ({ cx, cy, r, stroke, strokeWidth, fill }) => {
  return (
    <circle
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
