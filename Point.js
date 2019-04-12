class Point {
  constructor () {
    this.brain = new Brain(400);
    this.pos = createVector(400, 700);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.fitness = 0;
    this.dead = false;
    this.reachedGoal = false;
    this.isBest = false;
  }

  update (ObstListe, GoalPos) {
    if (!this.dead && !this.reachedGoal) {
      this.move();

    if (this.pos.x < 2 || this.pos.y < 2 || this.pos.x > width - 2 || this.pos.y > height - 2) {
      this.dead = true;
    }

    for (var i = 0; i < ObstListe.length; i++) {
      if (this.pos.x > ObstListe[i].pos.x && this.pos.x < ObstListe[i].pos.x + ObstListe[i].width && this.pos.y > ObstListe[i].pos.y && this.pos.y < ObstListe[i].pos.y + ObstListe[i].height) { // || this.pos.y < ObstListe[i].pos.y && this.pos.y > ObstListe[i].pos.y + ObstListe[i].height
        this.dead = true;
      }
    }

    if (dist(this.pos.x, this.pos.y, GoalPos.x, GoalPos.y) < 18) {
      this.reachedGoal = true;
    }


  }
    this.show();
  }

  move () {
    if (this.brain.step < this.brain.length) {
      this.acc = this.brain.VectorList[this.brain.step];
      this.brain.step++;
    }
    else {
      this.dead = true;
    }

    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);

  }

  show () {
    strokeWeight(0);
    if (this.isBest == true) {
      fill('rgb(0,255,0)');
      ellipse(this.pos.x, this.pos.y, 6, 6);
    }
    else if (this.dead == true || this.reachedGoal == true) {
      fill(120);
      ellipse(this.pos.x, this.pos.y, 6, 6);
    }
    else {
      fill(0);
      ellipse(this.pos.x, this.pos.y, 6, 6);
    }
  }

  //--------------------------------------------------------------------------
  //Genetic Stuff

  calculateFitness (GoalPos) {
    if (this.reachedGoal) {
      this.fitness = 1 / 16 + 10000 / (this.brain.step * this.brain.step);
    }
    else {
      var dist2goal = dist(this.pos.x, this.pos.y, GoalPos.x, GoalPos.y);
      this.fitness = 1 / (dist2goal * dist2goal);
    }
  }

  giveBaby () {
    var Baby = new Point();
    Baby.brain = this.brain.clone();
    return Baby;
  }

}
