export class Field {
  constructor(x, y, circle) {
    if (circle) {
      this.circle = circle;
    } else {
      this.circle = null;
    }

    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }
  setX(x) {
    this.x = x;
  }

  setY(y) {
    this.y = y;
  }

  getY() {
    return this.y;
  }

  getCircle() {
    return this.circle;
  }
}
