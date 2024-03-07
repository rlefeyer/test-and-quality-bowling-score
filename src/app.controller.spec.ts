import {BowlingScore} from './bowling.score';

describe('BowlingScore', () => {
    let bowlingScore: BowlingScore;

    it('should handle a simple frame without strikes or spares', () => {
        const frames = [3, 4]; // Pas de spare ni de strike
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(7);
    });

    it('should correctly calculate a spare and its bonus', () => {
        const frames = [7, 3, 4]; // A spare in the first frame, followed by a 4
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(18); // 10 (for the spare) + 4 (bonus) + 4
    });

    it('should correctly calculate a strike and its bonus', () => {
        const frames = [10, 3, 6]; // A strike followed by a 3 and a 6
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(28); // 10 (for the strike) + 9 (bonus) + 3 + 6
    });

    it('should handle consecutive strikes correctly', () => {
        const frames = [10, 10, 3, 2]; // Two consecutive strikes followed by a 3 and 2
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(43); // (10 + 10 + 3) + (10 + 3 + 2) + 3 + 2
    });

    it('should handle a spare followed by a strike', () => {
        const frames = [9, 1, 10, 3, 2]; // A spare followed by a strike and then a normal frame
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(40); // (10 + 10) + (10 + 3 + 2) + 3 + 2
    });

    it('should handle the last frame as a spare', () => {
        const frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 5]; // Last frame is a spare with a bonus roll
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(20); // Last frame spare with a 5 bonus
    });

    it('should handle the last frame as a strike', () => {
        const frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 3, 2]; // Last frame is a strike with two bonus rolls
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(20); // Last frame strike with a 3 and 2 bonus
    });
});
