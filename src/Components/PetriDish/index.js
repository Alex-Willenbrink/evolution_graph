import React, { Component } from "react";

import CellSvg from "../CellSvg";
import Cell from "./Cell";

// hold all cell info in PetriDish

const initCell = new Cell({
  cx: 50,
  cy: 50,
  r: 20,
  colorArray: [0.5, 0.5, 0.5],
  stroke: "black",
  strokeWidth: 2
});

class PetriDish extends Component {
  state = {
    cells: [initCell, initCell.divideCell()]
  };

  divideCells = () => {
    const { cells } = this.state;
    this.setState({
      cells: [...cells, cells[cells.length - 1].divideCell()]
    });
  };

  generateSvgCells = () =>
    this.state.cells.map(cell => {
      const { cx, cy, r, stroke, strokeWidth, fill, id } = cell;
      return (
        <CellSvg
          cx={cx}
          cy={cy}
          r={r}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          key={id}
        />
      );
    });

  render() {
    return (
      <div onClick={() => this.divideCells()}>
        <svg
          height="500"
          width="500"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          {this.generateSvgCells()}
        </svg>
      </div>
    );
  }
}

export default PetriDish;
