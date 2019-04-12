class Obstacle {
  constructor (pos, width, height) {
    this.pos = pos;
    this.width = width;
    this.height = height;
  }

  show () {
    fill('rgb(255, 255, 0)');
    rect(this.pos.x, this.pos.y, this.width, this.height);
  }
}
