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
    it('devrait gérer un jeu complet sans strikes ni spares', () => {
        // Une partie complète sans aucun strike ni spare
        const frames = [1, 0, 0, 1, 2, 2, 3, 3, 4, 4, 4, 5, 3, 6, 1, 7, 1, 8, 0, 9, 0, 0];
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(64);
    });

    it('devrait gérer un jeu parfait (que des strikes)', () => {
        // Un jeu parfait avec 12 strikes (10 frames + 2 bonus)
        const frames = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(300);
    });

    it('devrait valider les frames avec des valeurs négatives', () => {
        // Test avec des valeurs négatives pour s'assurer que la validation des scores est gérée
        const frames = [-1, 2, 3, 4];
        bowlingScore = new BowlingScore(frames);
        expect(() => bowlingScore.calculateTotalScore()).toThrow('Invalid frame score');
    });

    it('devrait valider les frames avec des scores de plus de 10', () => {
        // Test avec un score de frame supérieur à 10 pour s'assurer que la validation est gérée
        const frames = [11, 0, 3, 4];
        bowlingScore = new BowlingScore(frames);
        expect(() => bowlingScore.calculateTotalScore()).toThrow('Invalid frame score');
    });

    it('devrait gérer les spares dans la 10e frame correctement', () => {
        // Test avec un spare dans la 10e frame, suivi d'un lancer bonus
        const frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 10];
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(20);
    });

    it('devrait gérer les strikes dans la 10e frame correctement', () => {
        // Test avec un strike dans la 10e frame, suivi de deux lancers bonus
        const frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 2];
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(28);
    });

    it('devrait gérer une suite de spares', () => {
        // Test avec une suite de spares pour vérifier que les bonus sont correctement calculés
        const frames = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(150);
    });

    it('devrait gérer des frames alternant strikes et spares', () => {
        // Test avec des frames alternant strikes et spares
        const frames = [10, 5, 5, 10, 5, 5, 10, 5, 5, 10, 5, 5, 10];
        bowlingScore = new BowlingScore(frames);
        expect(bowlingScore.calculateTotalScore()).toBe(200);
    });
});
