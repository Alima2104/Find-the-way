
class Crew{
  constructor(m, num) {
    this.mutationRate = m; 
    this.crew = new Array(num); 
    this.matingPool = []; 
    this.generations = 0; // Number of generations
    //make a new set of creatures
    for (let i = 0; i < this.crew.length; i++) {
      let position = createVector(-50, height);
      this.crew[i] = new Character( position, new DNA(), this.crew.length);
    }
  }
  
  live(os) {
    for (let i = 0; i < this.crew.length; i++) {
      // If it finishes, mark it down as done!
      this.crew[i].checkTarget();
      this.crew[i].run(os);
    }
  }
  
  targetReached() {
    for (let i = 0; i < this.crew.length; i++) {
      if (this.crew[i].hitTarget) 
        return true;
    }
    return false;
  }
  
   // Calculate fitness for each creature
  calcFitness() {
    for (let i = 0; i < this.crew.length; i++) {
      this.crew[i].calcFitness();
    }
  }
  
  // Generate a mating pool
  selection() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    let maxFitness = this.getMaxFitness();

    for (let i = 0; i < this.crew.length; i++) {
      let fitnessNormal = map(
        this.crew[i].getFitness(), 0, maxFitness, 0,1);
      let n = int(fitnessNormal * 100); // Arbitrary multiplier
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.crew[i]);
      }
    }
  }
  // Making the next generation
  reproduction() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.crew.length; i++) {
      // Sping the wheel of fortune to pick two parents
      let m = int(random(this.matingPool.length));
      let d = int(random(this.matingPool.length));
      // Pick two parents
      let mom = this.matingPool[m];
      let dad = this.matingPool[d];
      // Get their genes
      let momgenes = mom.getDNA();
      let dadgenes = dad.getDNA();
      // Mate their genes
      let child = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new population with the new child
      let position = createVector(-50, initialPos);
      this.crew[i] = new Character(position, child, this.crew.length);
    }
    this.generations++;
  }
  
  getGenerations() {
    return this.generations;
  }

  // Find highest fitness for the population
  getMaxFitness() {
    let record = 0;
    for (let i = 0; i < this.crew.length; i++) {
      if (this.crew[i].getFitness() > record) {
        record = this.crew[i].getFitness();
      }
    }
    return record;
  }
}