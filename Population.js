class Population {
  constructor (size, GoalPos) {
    this.GoalPos = GoalPos;
    this.points = [];
    this.size = size;
    this.allPointsDead = false;
    this.gen = 1;
    this.fitnessSum = 0;
    this.bestPoint = 0;
    this.minStep = 1000;

    for (var i = 0; i < this.size; i++) {
      this.points.push(new Point());
    }
  }

  updateAll (ObstListe, GoalPos) {
    for (var i = 1; i < this.size; i++) {
      if (this.points[i].brain.step > this.minStep) {
        this.points[i].dead = true;
      }
      else {
        this.points[i].update(ObstListe, GoalPos);
      }
    }
    if (this.points[0].brain.step > this.minStep) {
      this.points[0].dead = true;
    }
    else {
      this.points[0].update(ObstListe, GoalPos);
    }
  }

  allDotsDead() {
    for (var i = 0; i < this.size; i++) {
      if (!this.points[i].dead && !this.points[i].reachedGoal) {
        return false;
      }
    }
    return true;
  }

  //--------------------------------------------------------------------------
  //Genetic Stuff

  naturalSelection () {
    var newPoints = [];

    this.setBestPoint();

    this.calculateFitnessSum();


    newPoints[0] = this.points[this.bestPoint].giveBaby();
    for (var i = 1; i < this.size; i++) {
      var parent = this.selectParent();
      newPoints[i] = parent.giveBaby();
    }
    this.points = newPoints;
    this.points[0].isBest = true;
    this.gen++;
    print("Generation: " + this.gen);
  }

  selectParent() {
    var rand = random(0, this.fitnessSum);
    var runningSum = 0;

    for (var i = 0; i < this.size; i++) {
      runningSum += this.points[i].fitness;
      if (runningSum > rand) {
        return this.points[i];
      }
    }
    return null;
  }

  mutate (MutVal) {
    for (var i = 1; i < this.size; i++) {
      this.points[i].brain.mutate(MutVal);
    }
  }

  //---------------------------------------------------------------------------
  //fitnessStuff

  calculateAllFitness (GoalPos) {
    for (var i = 0; i < this.size; i++) {
      this.points[i].calculateFitness(GoalPos);
    }
  }

  calculateFitnessSum () {
    this.fitnessSum = 0;
    for (var i = 0; i < this.size; i++) {
      this.fitnessSum += this.points[i].fitness;
    }
  }

  //---------------------------------------------------------------------------
  //Best Dot

  setBestPoint () {
    var max = 0;
    var BestDotIndex = 0;
    for (var i = 0; i < this.size; i++) {
      if (this.points[i].fitness > max) {
        max = this.points[i].fitness;
        BestDotIndex = i;
      }
    }
    this.bestPoint = BestDotIndex;

    if (this.points[this.bestPoint].reachedGoal) {
      this.minStep = this.points[this.bestPoint].brain.step;
    }
  }

}
