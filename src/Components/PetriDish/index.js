import React, { Component } from "react";

import CellSvg from "../CellSvg";
import { NamePath, PathString } from "../NamePath";

import Cell from "./Cell";
import Edge from "./Edge";

import "./PetriDish.css";

const pointInSvgPolygon = require("point-in-svg-polygon");
const segments = pointInSvgPolygon.segments(PathString);

const initCells = new Array(20).fill(0).map(
  (_, index) =>
    new Cell({
      cx: 30 + index * 18,
      cy: 118.5,
      r: 1,
      colorArray: [0.5, 0.5, 0.5],
      stroke: "black",
      strokeWidth: 0.5
    })
);

class PetriDish extends Component {
  state = {
    activeCells: initCells,
    senCells: [],
    edges: [],
    width: window.innerWidth,
    height: window.innerWidth * 0.12
  };

  componentDidMount() {
    this.timer = setInterval(async () => {
      await this.setWidthAndHeight();
      if (this.state.activeCells.length > 0) {
        await this.cleanCells();
        this.divideCells();
      }
    }, 400);
  }

  setWidthAndHeight = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerWidth * 0.12
    });
  };

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
      if (cell.divAttempts > 17) {
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

  isPointInsidePetriDish = (cx, cy) => {
    return pointInSvgPolygon.isInside([cx, cy], segments);
  };

  isCellInsidePetriDish = cell => {
    const { cx, cy } = cell;
    return this.isPointInsidePetriDish(cx, cy);
  };

  isPointOverlappingOtherCells = (cx, cy) => {
    for (let currCell of [...this.state.activeCells, ...this.state.senCells]) {
      let cxDiff = cx - currCell.cx;
      let cyDiff = cy - currCell.cy;
      if (cxDiff ** 2 + cyDiff ** 2 <= currCell.r ** 2) {
        return true;
      }
    }
    return false;
  };

  isCellOverlappingOtherCells = cell => {
    let { cx, cy, r } = cell;
    for (let currCell of [...this.state.activeCells, ...this.state.senCells]) {
      let cxDiff = cx - currCell.cx;
      let cyDiff = cy - currCell.cy;
      if (cxDiff ** 2 + cyDiff ** 2 <= (r + currCell.r) ** 2) {
        return true;
      }
    }
    return false;
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
          strokeWidth={"0.5"}
          key={id}
        />
      );
    });
  };

  render() {
    const { width, height } = this.state;
    const scaleNum = width / 403;
    return (
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <g
          className="petri-dish"
          transform={`scale(${scaleNum}, ${scaleNum}) translate(0, -80)`}
          stroke="none"
        >
          <NamePath fill={"#fff"} />
          {this.generateSvgEdges()}
          {this.generateSvgCells()}
        </g>
      </svg>
    );
  }
}

export default PetriDish;
