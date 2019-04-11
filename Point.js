class Point {
  constructor (x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.reachedGoal = false;
    this.dead = false;

    this.fitness = 0;
    this.step = 0;
    this.brain = new Brain(200);
  }

  moveStep (x, y) {
    if (dist(this.pos.x, this.pos.y, x, y) < 10) {
      this.reachedGoal = true;
      this.dead = true;
    }
    if (this.pos.x < 2|| this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height -2) {
      this.dead = true;
    }

    if (this.step < this.brain.VectorList.length && !this.dead) {
      this.acc = this.brain.VectorList[this.step];
      this.step++;
    }
    else {
      this.dead = true;
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
    }

      this.vel.add(this.acc);
      this.vel.limit(5);
      this.pos.add(this.vel);

    this.drawthis();
  }

  drawthis () {
    if (this.dead == false) {
      fill(0);
      ellipse(this.pos.x, this.pos.y, 10, 10);
    }
    else {
      fill(80);
      ellipse(this.pos.x, this.pos.y, 10, 10);
    }
  }

  calculateFitness (x, y) {
    //if (this.reachedGoal == true) {
    //  this.fitness = 0.01;
  //  }
    //else {
      var distancetoGoal = dist(this.pos.x, this.pos.x, x, y);
      this.fitness = 1 / (distancetoGoal * distancetoGoal);
    //}
    print("My fitness is = " + this.fitness)
  }

  giveBaby (startPos) {
    var Baby = new Point(400, 700);
    Baby.brain = this.brain;
    return Baby;
  }

}
