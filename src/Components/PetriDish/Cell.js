const gaussian = require("gaussian");
const shortId = require("shortid");

export default class Cell {
  constructor({ cx, cy, r, colorArray, stroke, strokeWidth }) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.colorArray = colorArray;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.fill = this.colorArrayToRgb(colorArray);
    this.id = shortId.generate();
  }

  colorArrayToRgb = colorArray =>
    `rgb(${colorArray.map(color => Math.floor(color * 256))})`;

  generateColor = colorValue => {
    // colorValue is a number with range (0 - 1)
    const std = colorValue > 0.5 ? 1 - colorValue : colorValue;

    // 2 standard deviations of mean should not generate color mutations
    const distribution = gaussian(colorValue, (std / 2) ** 2);
    const sample = distribution.ppf(Math.random()) % 1;
    return sample < 0 ? 1 + sample : sample;
  };

  generateColorArray = colorArray =>
    colorArray.map(colorValue => this.generateColor(colorValue));

  generateRadius = (colorArray, minRadius, maxRadius) => {
    // 3.5 => largest possible value
    const colorRadius =
      colorArray.reduce((sum, colorValue) => (sum += colorValue), 0) +
      Math.random() / 2;
    return Math.floor(colorRadius / 3.5 * (maxRadius - minRadius) + minRadius);
  };

  divideCell = () => {
    const colorArray = this.generateColorArray(this.colorArray);
    const r = this.generateRadius(colorArray, 3, 40);

    return new Cell({
      cx: this.cx + 30,
      cy: this.cy + 30,
      r,
      colorArray,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth
    });
  };
}
