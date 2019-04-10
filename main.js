var Canvas;
var Population1;
var Goal1;

function setup () {
  Canvas = createCanvas(800, 800);
  Population1 = new Population(200, 50, 50);
  Goal1 = new Goal(width/2, height/4);
}

function draw () {
  background(200);
  for (var i = 0; i < Population1.size; i++) {
    Population1.points[i].moveStep();
    Population1.points[i].calculateFitness();
  }
  Goal1.drawMe();

  if (Population1.allPointsDead = true) {

  }
}
