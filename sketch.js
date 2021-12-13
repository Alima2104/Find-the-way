let lifetime;
let population;
let lifecycle;
let recordtime;
let target;
let obstacles = [];
let whatisit;
let img, astr1IMG, astr2IMG, astr3IMG, helmet, littleAstr;
let x, y;
let c;
let down;
let stars = [];
let sky = 0;
var deg = 12;
let v = 0;
var mode = 0;
let myFont;
var slider, slider2, slider3;
var initialPos;
var colorOfCostume = 100;
let videoInput;
let photo;

function setup() {
  cvs = createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  c = 255; 
  videoInput = createCapture(VIDEO);
  videoInput.size(windowWidth, windowHeight);
  videoInput.position(0, 0);
  videoInput.hide(); 
  slider = createSlider(0, height, height, 50);
  myFont = loadFont("LeagueGothic-Regular.otf");
  for (let i = 0; i < 1000; i++) {
    stars[i] = new Star(
      random(width),
      random(height),
      random(255),
      random(0.1, 3),
      random(1)
    );
  }

  img = loadImage("planettt.png");
  astr1IMG = loadImage("astronaut1.png");
  astr2IMG = loadImage("astronaut22.png");
  astr3IMG = loadImage("astronaut3.png");
  helmet = loadImage("hello.png");
  littleAstr = loadImage("astr.png");

  lifetime = 900;
  lifecycle = 0;
  recordtime = lifetime;
  target = new blackHole(width - 24, 24, 200, 200, true);
  let mutationRate = 0.01;
  crew = new Crew(mutationRate, 100);

  holes = [];
  holes[1] = new blackHole(width / 2 - 100, 30, 100, 100, false);
  holes[2] = new blackHole(width / 2 + 100, height - 50, 100, 100, false);
}

function draw() {
  if (mode == 0) {
    screen1();
  } else if (mode == 1) {
    screenChoose();
  } else if (mode == 2) {
    screen2();
  } else if (mode == 3) {
    slider.hide();
    screen3();
  } else if (mode == 4) {
    slider.hide();
    screen5();
  }
}

function screen1() {
  background(sky, 50);
  fill(255);
  noStroke();
  textAlign(CENTER);
  textFont(myFont);
  textSize(90);
  text(
    "You are about to witness the crew of astronauts",
    width / 2,
    (2 * height) / 6
  );
  text("find their way back home", width / 2, (3 * height) / 6);
  text(
    "They're smart, so they can learn from their own mistakes",
    width / 2,
    (4 * height) / 6
  );
  text(
    "because they are powered by genetic algorithm",
    width / 2,
    (5 * height) / 6
  );
  textSize(60);
  text("Press anywhere to start", width / 2, height - 50);
}

function screenChoose() {
  background(0, 0, 153);
  for (let i = 0; i < stars.length; i++) {
    stars[i].twinkle();
    stars[i].showStar();
  }
  //imageMode(CENTER);
  fill(255);
  noStroke();
  textAlign(CENTER);
  textFont(myFont);
  textSize(70);
  text("Choose Your Crew Color", width / 2, height / 8);
  image(astr1IMG, 0, height / 4, (5.5 * width) / 18, (5 * height) / 8);
  image(
    astr2IMG,
    (6 * width) / 18,
    height / 4,
    (5.5 * width) / 18,
    (5 * height) / 8
  );
  image(
    astr3IMG,
    (12 * width) / 18,
    height / 4,
    (5.5 * width) / 18,
    (5 * height) / 8
  );
}

function overFirstPic() {
  if (
    mouseX >= 0 &&
    mouseX <= (5.5 * width) / 18 &&
    mouseY >= height / 4 &&
    mouseY <= (5 * height) / 8 + height / 4
  ) {
    return true;
  } else {
    return false;
  }
}

function overSecondPic() {
  if (
    mouseX >= (6 * width) / 18 &&
    mouseX <= (6 * width) / 18 + (5.5 * width) / 18 &&
    mouseY >= height / 4 &&
    mouseY <= (5 * height) / 8 + height / 4
  ) {
    return true;
  } else {
    return false;
  }
}

function overThirdPic() {
  if (
    mouseX >= (12 * width) / 18 &&
    mouseX <= (12 * width) / 18 + (5.5 * width) / 18 &&
    mouseY >= height / 4 &&
    mouseY <= (5 * height) / 8 + height / 4
  ) {
    return true;
  } else {
    return false;
  }
}

function screen2() {
  background(sky, 50);
  for (let i = 0; i < stars.length; i++) {
    stars[i].twinkle();
    stars[i].showStar();
  }
  target.display();
  fill(255);
  noStroke();
  textAlign(LEFT);
  textFont(myFont);
  textSize(15);
  text("Initial location", 20, 25);
  slider.position(20, 30);
  initialPos = slider.value();
  // If the generation hasn't ended yet
  if (lifecycle < lifetime) {
    crew.live(obstacles);
    if (crew.targetReached() && lifecycle < recordtime) {
      recordtime = lifecycle;
    }
    lifecycle++;
    // Otherwise a new generation
  } else {
    screen4();
    fill(255);
    noStroke();
    textAlign(CENTER);
    textFont(myFont);
    textSize(100);
    text("Generation # " + crew.getGenerations(), width / 2, height / 2 - 100);
    text("Record Time: " + recordtime, width / 2, height / 2 + 100);
    text("Press SPACEBAR to continue", width / 2, height - 100);

    if (crew.getGenerations() == 1) {
      slider.hide();
      mode++;
    }
  }

  holes[1].display();
  holes[1].wander();
  holes[1].update();
  holes[1].edges();

  holes[2].display();
  holes[2].wander();
  holes[2].update();
  holes[2].edges();
}

function keyPressed() {
  if (keyCode == 32) {
    lifecycle = 0;
    crew.calcFitness();
    crew.selection();
    crew.reproduction();
  }
  if (keyCode == RIGHT_ARROW) {
    if (mode == 0) {
      mode = 1;
    } else if (mode == 1) {
      mode = 2;
    } else if (mode == 2) {
      mode = 3;
    } else if (mode == 3) {
      mode = 4;
    } else if (mode == 4) {
      mode = 0;
    }
  }
  if (key == "s") {
    saveCanvas(cvs, "screenshot", "png");
  }
}

function mousePressed() {
  if (overFirstPic()) {
    colorOfCostume = 255;
    mode++;
  }
  if (overSecondPic()) {
    colorOfCostume = color(255, 153, 0);
    mode++;
  }
  if (overThirdPic()) {
    colorOfCostume = color(255, 153, 204);
    mode++;
  }
}

function screen3() {
  background(sky, 50);
  for (let i = 0; i < stars.length; i++) {
    stars[i].twinkle();
    stars[i].showStar();
  }
  fill(255);
  noStroke();
  textAlign(CENTER);
  textFont(myFont);
  textSize(90);
  text("Most of the astronauts found their way home!", width / 2, height / 3);
  text(
    "You take a photo on the next page if you want",
    width / 2,
    (2 * height) / 3
  );
  text("just press 'k' to do it", width / 2, (16 * height) / 18);
}

function screen4() {
  background(sky, 50);
}

function screen5() {
  clear();
  background(sky);
  for (let i = 0; i < stars.length; i++) {
    stars[i].twinkle();
    stars[i].showStar();
  }
  imageMode(CENTER);
  image(img, 10, 20, 400, 400);
  image(littleAstr, (5 * width) / 6, height / 7, 150, 230);
  // image(littleAstr, 4*width/6, height/7, 60, 100);

  image(videoInput, width / 2, height / 2, width / 2 - 100, height / 2 + 50);

  imageMode(CENTER);
  image(helmet, width / 2, height / 2, width / 2 + 100, height / 2 + 250);
}
