class Goal {

  constructor (x, y) {
    this.pos = createVector(x, y);
  }

  drawMe () {
    fill(color(255, 204, 0));
    ellipse(this.pos.x, this.pos.y, 30, 30);
  }

}
