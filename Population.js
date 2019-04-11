class Population {
  constructor (size, x, y, StartPos) {
    this.StartPos;
    this.points = []
    this.size = size;
    this.allPointsDead = false;
    this.gen = 1;

    this.fitnessSum = 0;

    for (var i = 0; i < size; i++) {
      this.points.push(new Point(x, y));
    }
  }

  testAllDotsDead () {
    var p = 0;
    for (var i = 0; i < this.size; i++) {
      if (this.points[i].dead == false) {
        p++;
      }
    }
    if (p == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  calculateFitness (x, y) {
    for (var i = 0; i < this.points.length; i++) {
      this.points[i].calculateFitness(x, y);
    }
  }

  calculateFitnessSum () {
    this.fitnessSum = 0;
    for (var i = 0; i < this.size; i++) {
      this.fitnessSum += this.points[i].fitness;
    }
  }

  naturalSelection() {
    var newPoints = [];

    this.calculateFitnessSum();


    for (var i = 0; i < this.size; i++) {
      var parent = this.selectParent();
      newPoints[i] = parent.giveBaby(this.StartPos);
    }
    this.points = newPoints;
    this.gen++;
    print("Generation: " + this.gen);
  }

  selectParent() {
    var rand = random(0, this.fitnessSum);

    var runningSum = 0;

    for (var i = 0; i < this.size; i++) {
      runningSum += this.points[i].fitness;
      if (runningSum > rand) {
        //print("i = " + i);
        return this.points[i];
      }
    }
    return null;
  }

  mutate () {
    for (var i = 0; i < this.size; i++) {
      this.points[i].brain.mutate();
    }
  }

}
