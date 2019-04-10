class Point {
  constructor (x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.dead = false;

    this.fitness = 0;
    this.step = 0;
    this.brain = new Brain(random(50, 300));
  }

  moveStep () {

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
    fill(0);
    if (this.dead == false) {
      fill(0);
      ellipse(this.pos.x, this.pos.y, 10, 10);
    }
    else {
      fill(80);
      ellipse(this.pos.x, this.pos.y, 10, 10);
    }
  }

  calculateFitness () {

  }

}
