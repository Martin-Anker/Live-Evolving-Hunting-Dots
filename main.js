var Canvas;
var Population1;
var Goal1;

var StartPos;

function setup () {
  StartPos = createVector(400, 400)
  Canvas = createCanvas(800, 800);
  Goal1 = new Goal(width/2, height/8);
  Population1 = new Population(200, 400, 700, StartPos);
}

function draw () {
  background(200);

  if (Population1.testAllDotsDead() == false) {
    for (var i = 0; i < Population1.size; i++) {
      Population1.points[i].moveStep(Goal1.pos.x, Goal1.pos.y);
    }
    Goal1.drawMe();
  }
  else {
    Population1.calculateFitness(Goal1.pos.x, Goal1.pos.y);
    Population1.naturalSelection();
    Population1.mutate();
    print(Population1.points.length);
  }
}
