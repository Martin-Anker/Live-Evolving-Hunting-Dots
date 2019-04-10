class Population {
  constructor (size, x, y) {
    this.points = []
    this.size = size;
    this.allPointsDead = false;

    for (var i = 0; i < size; i++) {
      this.points.push(new Point(x, y));
    }
    print(this.points);
  }


}
