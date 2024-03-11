import {BowlingScore} from './bowling.score';

describe('BowlingScore', () => {
    let bowlingScore: BowlingScore;

    it('Pas de strike ni de spare', () => {
        const frames = [3, 4]; // Pas de spare ni de strike
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(7);
    });

    it('devrait calculer correctement un spare et son bonus', () => {
        const frames = [7, 3, 4]; // Un spare dans le premier lancer, suivi d'un 4
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(18);  // 10 (pour le spare) + 4 (bonus) + 4
    });

    it('devrait calculer correctement un strike et son bonus', () => {
        const frames = [10, 3, 6]; // Un strike suivi d'un 3 et d'un 6
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(28);  // 10 (pour le strike) + 9 (bonus) + 3 + 6
    });

    it('devrait gérer correctement des strikes consécutifs', () => {
        const frames = [10, 10, 3, 2]; // Deux strikes consécutifs suivis d'un 3 et d'un 2
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(43); // (10 + 10 + 3) + (10 + 3 + 2) + 3 + 2
    });

    it('devrait gérer un spare suivi d\'un strike', () => {
        const frames = [9, 1, 10, 3, 2]; // Un spare suivi d'un strike puis d'une frame normale
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(40); // (10 + 10) + (10 + 3 + 2) + 3 + 2
    });

    it('devrait gérer la dernière frame comme un spare', () => {
        const frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 5]; // La dernière frame est un spare avec un lancer bonus
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(20); // Dernière frame spare avec un bonus de 5
    });

    it('devrait gérer la dernière frame comme un strike', () => {
        const frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 3, 2]; // La dernière frame est un strike avec deux lancers bonus
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(20); // Dernière frame strike avec un bonus de 3 et 2
    });
});
