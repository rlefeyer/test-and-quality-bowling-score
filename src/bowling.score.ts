export class BowlingScore {
    constructor(private readonly frames: number[]) {}
  
    calculateTotalScore(): number {
      let totalScore = 0;
      for (let i = 0; i < this.frames.length; i++) {
        totalScore += this.frames[i];
      }
      return totalScore;
    }
  
  }
  