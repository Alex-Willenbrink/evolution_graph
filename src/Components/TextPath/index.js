import React, { Component } from "react";

const vectorizeText = require("vectorize-text");

export default class TextPath extends Component {
  constructor(props) {
    super(props);
  }

  generateTextPaths = () => {
    const { text } = this.props;

    const polygons = vectorizeText(text || "default text", {
      polygons: true,
      fontWeight: "bold",
      // width: 500,
      textBaseline: "top",
      font: ['"Roboto", verdana, arial, sans-serif'],
      height: 100
    });

    const testPathText = [];

    polygons.forEach(loops => {
      let dPathParamArray = [];
      loops.forEach(loop => {
        let start = loop[0];
        dPathParamArray.push(`M ${start[0]} ${start[1]}`);
        for (let i = 1; i < loop.length; ++i) {
          let p = loop[i];
          dPathParamArray.push(`L ${p[0]} ${p[1]}`);
        }
        dPathParamArray.push(`L ${start[0]} ${start[1]}`);
      });
      testPathText.push(
        <path d={dPathParamArray.join("")} strokeWidth={1} fill={"red"} />
      );
    });

    return testPathText;
  };

  render() {
    return this.generateTextPaths();
  }
}
