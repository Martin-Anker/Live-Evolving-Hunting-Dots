var Canvas;
var test;
var ObstListe = [];
var SpeedSlider;
var MutationSlider;
var SpeedVal;
var MutVal;
var GoalPos;
var PopSlider;
var PopSize = 200;


function setup () {
  GoalPos = createVector(400, 50);
  Canvas = createCanvas(800, 800);
  test = new Population(PopSize, GoalPos);
  ObstListe.push(new Obstacle(createVector(500, 200), 200, 200));
  createMenu();
  stroke(0);
}

function draw () {
  SpeedVal = SpeedSlider.value();
  frameRate(map(SpeedVal, 0, 255, 5, 100));


  PopSize = PopSlider.value();
  PopSize = map(PopSize, 0, 255, 50, 800);

  MutVal = MutationSlider.value();
  MutVal = map(MutVal, 0, 255, 0.001, 0.1);
  background(200);

  for (var i = 0; i < ObstListe.length; i++) {
    ObstListe[i].show();
  }

  //draw Goal
  fill('rgb(255,0,255)');
  ellipse(GoalPos.x, GoalPos.y, 30, 30);

  if (test.allDotsDead()) {
    //genetic code
    test.calculateAllFitness(GoalPos);
    test.naturalSelection(PopSize);
    test.mutate(MutVal);
  }

  else {
    test.updateAll(ObstListe, GoalPos);
  }
}

function createMenu () {
    SpeedSlider = createSlider(0, 255, 100);
    SpeedSlider.position(width + 20, 10);
    SpeedSlider.style('width', '140px');

    MutationSlider = createSlider(0, 255, 30);
    MutationSlider.position(width + 20, 40);
    MutationSlider.style('width', '140px');

    PopSlider = createSlider(0, 255, 130);
    PopSlider.position(width + 20, 70);
    PopSlider.style('width', '140px');

    Button = createButton('Restart Population');
    Button.position(width + 20, 100);
    Button.mousePressed(restart);
}

function mouseDragged () {
  if (dist(mouseX, mouseY, GoalPos.x, GoalPos.y) < 20) {
    GoalPos = createVector(mouseX, mouseY);
  }

  for (var i = 0; i < ObstListe.length; i++) {
    if (mouseX > ObstListe[i].pos.x && mouseX < ObstListe[i].pos.x + ObstListe[i].width && mouseY > ObstListe[i].pos.y && mouseY < ObstListe[i].pos.y + ObstListe[i].height) {
      ObstListe[i].pos = createVector(mouseX - ObstListe[i].width/2, mouseY - ObstListe[i].width/2);
    }
  }
}

function restart () {
  test = new Population(PopSize, GoalPos);
}
