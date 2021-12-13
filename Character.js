class Character{
  constructor(pos, dna, totalChars) {
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = pos.copy();
    this.r = 10;
    this.dna = dna;
    this.finishTime = 0;
    this.recordDist = 10000; // Some high number that will be beat instantly
    this.fitness = 0;
    this.geneCounter = 0;
    this.hitObstacle = false; 
    this.hitTarget = false; // Did I reach the target
}
  calcFitness() {
     if (this.recordDist < 1) 
       this.recordDist = 1;
    this.fitness = 1 / (this.finishTime * this.recordDist);    // Make the function exponential
    if (this.hitObstacle) this.fitness *= 0.1; 
    if (this.hitTarget) this.fitness *= 2; 
  }
  

  run(os) {
    if (!this.hitObstacle && !this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
      // If I hit an edge or an obstacle
      this.obstacles(os);
    }
    // Draw me!
    if (!this.hitObstacle) {
      this.display();
    }
  }
  checkTarget() {
      let d = dist(
      this.position.x,
      this.position.y,
      target.position.x,
      target.position.y
    );
    if (d < this.recordDist) this.recordDist = d;

    if (target.contains(this.position) && !this.hitTarget) {
      this.hitTarget = true;
    } else if (!this.hitTarget) {
      this.finishTime++;
    }
  }
  // Did I hit an obstacle?
  obstacles(os) {
    for (let i = 0; i < os.length; i++) {
      let obs = os[i];
      if (obs.contains(this.position)) {
        this.hitObstacle = true;
        
      }
    }
  }

  applyForce(f) {
    //var ff = f+10;
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    if (this.hitObstacle==true){
      this.position = -100;
    }
  }

  display(){
    let theta = this.velocity.heading() + PI / 2;
    fill(colorOfCostume);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    rectMode(CORNER);
    rect(-this.r*3/2, 0, this.r*3, this.r*3);
    fill(colorOfCostume);
    circle(0,0,this.r*3);
    fill(0);
    circle(0,0,this.r*2);
    fill(255);
    circle(-this.r/2,-this.r/3,this.r/2);
    
   fill(colorOfCostume);
  // noStroke();
    rect(-this.r*3/2, this.r*3, this.r, this.r);
    rect(this.r/2, this.r*3, this.r, this.r);
    rect(-this.r*2, this.r, this.r, this.r);
    rect(this.r*3/2, this.r, this.r, this.r);
    pop();
  }
  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  stopped() {
    return this.hitObstacle;
  }
}
