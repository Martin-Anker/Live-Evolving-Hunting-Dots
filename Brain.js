class Brain {
  constructor (length) {
    this.length = length;
    this.VectorList = [];
    this.randomize();
    this.step = 0;
  }

  randomize () {
    for (var i = 0; i < this.length; i++) {
      this.VectorList.push(p5.Vector.fromAngle(radians(random(0, 360))));
    }
  }

  clone () {
    var TheClone = new Brain(400);
    for (var i = 0; i < this.length; i++) {
      TheClone.VectorList[i] = this.VectorList[i].copy();
    }
    return TheClone;
  }

  mutate (MutVal) {
    var mutationRate = MutVal;
    for (var i = 0; i < this.length; i++) {
      var rand = random(0, 1);
      if (rand < mutationRate) {
        this.VectorList[i] = p5.Vector.fromAngle(radians(random(0, 360)))
      }
    }
  }
}
