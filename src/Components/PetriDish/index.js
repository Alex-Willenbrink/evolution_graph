import React, { Component } from "react";

import CellSvg from "../CellSvg";
import { NamePath, PathString } from "../NamePath";

import Cell from "./Cell";
import Edge from "./Edge";

const pointInSvgPolygon = require("point-in-svg-polygon");
const pathString =
  "M407 1877 c-8 -18 -34 -92 -58 -165 -39 -118 -46 -132 -66 -132 -21 0 -23 -4 -23 -55 l0 -55 2245 0 2245 0 0 55 c0 51 -2 55 -24 55 -19 0 -36 18 -82 85 l-58 85 20 28 c11 15 37 51 58 80 l38 52 -44 0 c-43 0 -44 -1 -87 -70 -23 -38 -49 -70 -57 -70 -11 0 -14 16 -14 70 l0 70 -35 0 -35 0 0 -165 0 -165 -35 0 -35 0 0 165 0 165 -35 0 -34 0 -3 -111 -3 -111 -65 111 c-61 106 -66 111 -97 111 l-33 0 0 -165 0 -165 -35 0 -35 0 0 165 0 165 -35 0 -35 0 0 -165 0 -165 -29 0 c-33 0 -41 14 -41 72 0 29 -6 45 -23 60 l-23 21 23 23 c41 41 24 112 -32 139 -22 10 -62 15 -119 15 l-86 0 0 -165 0 -165 -46 0 -45 0 20 26 c28 36 27 89 -2 118 -23 23 -23 24 -5 46 10 12 18 33 18 47 0 65 -50 93 -170 93 l-80 0 0 -165 0 -165 -30 0 -30 0 0 165 0 165 -35 0 -34 0 -3 -112 -3 -112 -65 109 c-63 106 -67 110 -103 113 l-37 3 0 -165 c0 -159 -1 -166 -20 -166 -13 0 -20 7 -20 20 0 17 -8 19 -82 22 l-83 3 0 45 0 45 73 3 c69 3 72 4 72 27 0 23 -3 24 -72 27 l-73 3 0 40 0 40 83 3 c80 3 82 3 82 27 l0 25 -115 0 -115 0 0 -165 c0 -158 -1 -165 -20 -165 -13 0 -20 7 -20 20 0 18 -7 20 -80 20 l-80 0 0 145 0 145 -35 0 -35 0 0 -165 c0 -134 -3 -165 -14 -165 -7 0 -16 9 -19 20 -5 18 -14 20 -81 20 l-76 0 0 145 0 145 -35 0 -35 0 0 -165 0 -165 -35 0 -35 0 0 165 0 165 -30 0 -30 0 0 -165 0 -165 -60 0 c-33 0 -60 4 -60 10 0 5 16 77 35 159 19 82 35 151 35 155 0 3 -16 6 -35 6 -24 0 -35 -5 -35 -15 0 -8 -10 -61 -22 -117 l-22 -103 -14 50 c-49 179 -52 185 -77 185 -21 0 -27 -8 -41 -57 -9 -32 -24 -85 -33 -118 l-17 -60 -24 118 -24 117 -33 0 c-18 0 -33 -3 -33 -6 0 -4 16 -73 35 -155 19 -82 35 -154 35 -160 0 -6 -39 -9 -107 -7 l-106 3 -49 78 -49 78 37 62 c21 34 44 72 52 85 14 22 13 22 -27 22 -40 0 -42 -2 -68 -55 -15 -30 -31 -55 -35 -55 -5 0 -20 25 -35 55 -26 52 -29 55 -65 55 -21 0 -38 -2 -38 -5 0 -2 20 -38 45 -78 25 -41 45 -79 45 -85 0 -6 -21 -45 -46 -87 -44 -73 -74 -95 -74 -55 0 18 -7 20 -80 20 l-80 0 0 50 0 50 70 0 c68 0 70 1 70 25 0 24 -2 25 -70 25 l-70 0 0 45 0 45 80 0 c79 0 80 0 80 25 l0 25 -115 0 -115 0 0 -165 c0 -158 -1 -165 -20 -165 -13 0 -20 7 -20 20 0 18 -7 20 -75 20 l-75 0 0 145 0 145 -35 0 -35 0 0 -165 c0 -155 -1 -165 -19 -165 -15 0 -29 30 -76 165 l-58 165 -33 0 c-29 0 -36 -5 -47 -33z m2702 -187 c34 -56 61 -103 61 -105 0 -3 -29 -5 -65 -5 l-65 0 0 105 c0 58 2 105 4 105 3 0 32 -45 65 -100z m1111 4 c30 -53 57 -100 58 -105 2 -5 -26 -9 -62 -9 l-66 0 0 105 c0 58 3 105 8 105 4 0 32 -43 62 -96z";

var segments = pointInSvgPolygon.segments(pathString);
// var result = pointInSvgPolygon.isInside([x, y], segments);

// hold all cell info in PetriDish

const initCells = new Array(20).fill(0).map(
  (_, index) =>
    new Cell({
      cx: 60 + index * 50,
      cy: 170,
      r: 3,
      colorArray: [0.5, 0.5, 0.5],
      stroke: "black",
      strokeWidth: 1
    })
);

class PetriDish extends Component {
  state = {
    activeCells: initCells,
    senCells: [],
    edges: [],
    height: 300,
    width: 1200
  };

  // componentDidMount() {
  //   this.timer = setInterval(async () => {
  //     console.log(this.state);
  //     await this.cleanCells();
  //     this.divideCells();
  //   }, 300);
  // }

  divideCells = () => {
    const { activeCells, edges } = this.state;
    const cellNum = activeCells.length;
    let newCell;

    for (let i = 0; i < cellNum; i++) {
      newCell = activeCells[i].divideCell();
      if (
        this.isCellInsidePetriDish(newCell) &&
        !this.isCellOverlappingOtherCells(newCell)
      ) {
        edges.push(
          new Edge({
            x1: activeCells[i].cx,
            y1: activeCells[i].cy,
            x2: newCell.cx,
            y2: newCell.cy
          })
        );
        activeCells.push(newCell);
      }
    }

    this.setState({
      activeCells: [...activeCells],
      edges: [...edges]
    });
  };

  cleanCells = () => {
    const { activeCells } = this.state;
    const senCells = [];
    const checkedActiveCells = [];
    activeCells.forEach(cell => {
      if (!this.isCellActive(cell)) {
        senCells.push(cell);
      } else {
        checkedActiveCells.push(cell);
      }
    });

    this.setState({
      senCells: [...this.state.senCells, ...senCells],
      activeCells: [...checkedActiveCells]
    });
  };

  isCellActive = cell => {
    const { cx, cy, r } = cell;
    let activePositions = 0;
    [
      [0, -2],
      [2, -2],
      [2, 0],
      [2, 2],
      [2, 0],
      [2, -2],
      [-2, 0],
      [-2, -2]
    ].forEach(dirArray => {
      activePositions += this.isPointInsidePetriDish(
        cx + dirArray[0] * r,
        cy + dirArray[1] * r
      )
        ? 1
        : 0;
    });
    return activePositions > 2;
  };

  isPointInsidePetriDish = (cx, cy) => {
    const element = document.elementFromPoint(cx, cy);
    return element && element.id === "name-path";
  };

  isPointInsidePetriDishSvg = (cx, cy) => {
    return pointInSvgPolygon.isInside([cx, cy], segments);
  };

  isCellInsidePetriDish = cell => {
    const { cx, cy, r } = cell;
    let insidePetriDish = true;
    [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(dirArray => {
      insidePetriDish =
        this.isPointInsidePetriDish(
          cx + dirArray[0] * r,
          cy + dirArray[1] * r
        ) && insidePetriDish;
    });
    return insidePetriDish;
  };

  isCellOverlappingOtherCells = cell => {
    return [
      ...this.state.activeCells,
      ...this.state.senCells
    ].reduce((isOverlapping, existingCell) => {
      const { cx, cy, r } = existingCell;
      const cxDiff = cell.cx - cx;
      const cyDiff = cell.cy - cy;

      return cxDiff ** 2 + cyDiff ** 2 <= (r + cell.r) ** 2 || isOverlapping;
    }, false);
  };

  generateSvgCells = () =>
    [...this.state.activeCells, ...this.state.senCells].map(cell => {
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
        height={this.state.height}
        width={this.state.width}
        viewBox={`0 0 ${this.state.width} ${this.state.height}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="rgb(0.1, 0.1, 0.1)"
      >
        <rect
          x={0}
          y={0}
          fill={"white"}
          width={this.state.width}
          height={this.state.height}
        />
        <NamePath id={"name-path"} />
        {this.generateSvgEdges()}
        {this.generateSvgCells()}
      </svg>
    );
  }
}

export default PetriDish;
