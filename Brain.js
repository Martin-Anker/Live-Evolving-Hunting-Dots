class Brain {
  constructor (length) {
    this.VectorList = [];
    for (var i = 0; i < length; i++) {
      this.VectorList.push(p5.Vector.fromAngle(radians(random(0, 360))));
    }
  }
}
