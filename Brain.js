class Brain {
  constructor (length) {
    this.length;
    this.mutationRate = 0.03;
    this.VectorList = [];
    for (var i = 0; i < length; i++) {
      this.VectorList.push(p5.Vector.fromAngle(radians(random(0, 360))));
    }
  }

  mutate () {
    //print(rand);
    for (var i = 0; i < 200; i++) {
      var rand = random(1);
      if (rand < this.mutationRate) {
        this.VectorList[i] = p5.Vector.fromAngle(radians(random(0, 360)));
      }
    }
  }
}
