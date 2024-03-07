export class BowlingScore {
    constructor(private readonly frames: number[]) {
    }

    calculateTotalScore(): number {
        let totalScore = 0;
        for (let i = 0; i < this.frames.length; i++) {
            totalScore += this.frames[i];
            if (this.isSpare(i)) {
                totalScore += this.calculateSpareBonus(i);
            } else if (this.isStrike(i)) {
                totalScore += this.calculateStrikeBonus(i);
            }
        }
        return totalScore;
    }

    public isSpare(frameIndex: number): boolean {
        // Ensure we have a next roll to pair with this one for a spare
        return (frameIndex % 2 === 0) && (frameIndex + 1 < this.frames.length) && (this.frames[frameIndex] + this.frames[frameIndex + 1] === 10);
    }

    public isStrike(frameIndex: number): boolean {
        return this.frames[frameIndex] === 10;
    }

    public calculateSpareBonus(frameIndex: number): number {
        // Ensure we have a next roll to add as a bonus
        if (frameIndex + 2 < this.frames.length) {
            return this.frames[frameIndex + 2];
        }
        return 0; // No bonus if there is no next roll
    }

    public calculateStrikeBonus(frameIndex: number): number {
        // Ensure we have two more rolls to add as a bonus
        if (frameIndex + 2 < this.frames.length) {
            return this.frames[frameIndex + 1] + this.frames[frameIndex + 2];
        }
        return 0; // No bonus if there aren't two more rolls
    }
}
