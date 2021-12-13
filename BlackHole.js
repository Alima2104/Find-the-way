class blackHole{
  constructor(x, y, w, h, whatisit) {
    this.position = createVector(x, y);
    this.w = w;
    this.h = h;
    this.type = whatisit;
    
    //this.pos = createVector(x, y);
    this.vel = createVector(1, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 0.05;
    this.maxForce = 0.2;
    this.r = 200;
    this.wanderTheta = PI/10 ;
    this.currentPath = [];
    this.paths = [this.currentPath];
  }
  
   applyForce(force) {
    this.acc.add(force);
  }
  
   wander() {
    let wanderPoint = this.vel.copy();
    wanderPoint.setMag(100);
    wanderPoint.add(this.pos);
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.vel.heading();
    let x = wanderRadius * cos(theta);
    let y = wanderRadius * sin(theta);
    wanderPoint.add(x, y);
    let steer = wanderPoint.sub(this.position);
    steer.setMag(this.maxForce);
    this.applyForce(steer);

    let displaceRange = 0.3;
    this.wanderTheta += random(-displaceRange, displaceRange);
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.position.add(this.vel);
    this.acc.set(0, 0);
    this.currentPath.push(this.position.copy());
  }
  
  edges(){
    if (this.position.x >= width) {this.position.x = 0}
    if (this.position.x <= 0) {this.position.x = width}
    if (this.position.y >= height) {this.position.y = 0}
    if (this.position.y <= 0) {this.position.y = height}
  }
  
  display() {
    if (this.type == true){
      imageMode(CENTER);
       image(img,this.position.x, this.position.y,this.w, this.h);
    }
    else {
  translate(this.position.x, this.position.y)
  fill(0);
  let t = map(noise(v), 0, 1, 0, 200);
  let u = map(noise(v), 0, 1, 100, 500);
  stroke(map(noise(t), 0, 1, 0, 255), map(noise(u), 0, 1, 0, 255), map(noise(t*u), 0, 1, 0, 255));
  
  beginShape();
  for (let a = 0; a < HALF_PI; a += 0.02) {
    let r = map(noise(t,u), 0, 1, 0, 300);
    let x = cos(a) * r;
    let y = sin(a) * r;
    vertex(x,y);
    t += 0.01;
  }
  for (let a = HALF_PI; a < PI; a += 0.02) {
    let r = map(noise(t,u), 0, 1, 0, 300);
    let x = cos(a) * r;
    let y = sin(a) * r;
    vertex(x,y);
    u += 0.01;
  }
  for (let a = PI; a < HALF_PI * 3; a += 0.02) {
    let r = map(noise(t,u), 0, 1, 0, 300);
    let x = cos(a) * r;
    let y = sin(a) * r;
    vertex(x,y);
    t -= 0.01;
  }
  for (let a = HALF_PI * 3 ; a < TWO_PI; a += 0.02) {
    let r = map(noise(t,u), 0, 1, 0, 300);
    let x = cos(a) * r;
    let y = sin(a) * r;
    vertex(x,y);
    u -= 0.01;
  }
  endShape(CLOSE);

  v += (mouseX - width / 2) / 3000000;
    }
  }
  contains(spot) {
    if (
      spot.x > this.position.x &&
      spot.x < this.position.x + this.w &&
      spot.y > this.position.y &&
      spot.y < this.position.y + this.h
    ) {
      return true;
    } else {
      return false;
    }
  }

}
