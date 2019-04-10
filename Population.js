class Population {
  constructor (size, x, y) {
    this.points = []
    this.size = size;
    for (var i = 0; i < size; i++) {
      this.points.push(new Point(x, y));
    }
    print(this.points);
  }
}
