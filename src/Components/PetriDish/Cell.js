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
    this.divAttempts = 0;
    this.divAngle = this.generateAngle();
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
    return colorRadius / 3.5 * (maxRadius - minRadius) + minRadius;
  };

  generateAngle = () => Math.floor(Math.random() * 360);

  generatePosition = r => {
    const minDistance = r + this.r;
    const maxDistance = minDistance * 1.5;
    const avgDistance = (minDistance + maxDistance) / 2;
    const variance = (minDistance / 2) ** 2;

    const distribution = gaussian(avgDistance, variance);
    const distance = distribution.ppf(Math.random());

    const x = distance * Math.cos(this.divAngle);
    const y = distance * Math.sin(this.divAngle);

    return {
      cx: this.cx + x,
      cy: this.cy + y
    };
  };

  divideCell = () => {
    this.divAngle += 20;
    this.divAttempts++;

    const colorArray = this.generateColorArray(this.colorArray);
    const r = this.generateRadius(colorArray, 0.4, 1.6);
    const { cx, cy } = this.generatePosition(r);

    return new Cell({
      cx,
      cy,
      r,
      colorArray,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth
    });
  };
}
