import React, { Component } from "react";

import CellSvg from "../CellSvg";
import Cell from "./Cell";
import Edge from "./Edge";

// hold all cell info in PetriDish

const initCell = new Cell({
  cx: 250,
  cy: 250,
  r: 10,
  colorArray: [0.5, 0.5, 0.5],
  stroke: "black",
  strokeWidth: 2
});

class PetriDish extends Component {
  state = {
    cells: [initCell],
    edges: [],
    height: 500,
    width: 500
  };

  divideCells = () => {
    const { cells, edges } = this.state;
    const cellNum = cells.length;
    let newCell;

    for (let i = 0; i < cellNum; i++) {
      newCell = cells[i].divideCell();
      if (
        this.isCellInsidePetriDish(newCell) &&
        !this.isCellOverlappingOtherCells(newCell)
      ) {
        edges.push(
          new Edge({
            x1: cells[i].cx,
            y1: cells[i].cy,
            x2: newCell.cx,
            y2: newCell.cy
          })
        );
        cells.push(newCell);
      }
    }

    this.setState({
      cells: [...cells],
      edges: [...edges]
    });
  };

  isCellInsidePetriDish = cell => {
    const { cx, cy, r } = cell;
    const { width, height } = this.state;
    return cx + r < width && cx - r > 0 && cy + r < height && cy - r > 0;
  };

  isCellOverlappingOtherCells = cell => {
    return this.state.cells.reduce((isOverlapping, existingCell) => {
      const { cx, cy, r } = existingCell;
      const cxDiff = cell.cx - cx;
      const cyDiff = cell.cy - cy;

      return cxDiff ** 2 + cyDiff ** 2 <= (r + cell.r) ** 2 || isOverlapping;
    }, false);
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

  generateSvgEdges = () => {
    return this.state.edges.map(edge => {
      const { x1, y1, x2, y2, id } = edge;
      return (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={"rgb(0, 0, 0)"}
          strokeWidth={"2"}
          key={id}
        />
      );
    });
  };

  render() {
    return (
      <svg
        onClick={() => this.divideCells()}
        height={this.state.height}
        width={this.state.width}
        viewBox={`0 0 ${this.state.width} ${this.state.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.generateSvgEdges()}
        {this.generateSvgCells()}
      </svg>
    );
  }
}

export default PetriDish;
