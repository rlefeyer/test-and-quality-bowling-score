import {Body, Controller, Get, Post} from '@nestjs/common';
import {AppService} from './app.service';
import {BowlingScore} from './bowling.score';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('bowling-score')
    calculateScore(@Body() frames: number[]): number {
        const score = new BowlingScore(frames);
        return score.calculateTotalScore();
    }

    @Post('bowling-score/spares')
    calculateSpares(@Body() frames: number[]): number {
        const score = new BowlingScore(frames);
        let totalSpareBonus = 0;
        // La boucle parcourt les cadres deux par deux pour vérifier les spares
        for (let i = 0; i < frames.length - 1; i += 2) {
            if (score.isSpare(i)) {
                totalSpareBonus += score.calculateSpareBonus(i);
            }
        }
        return totalSpareBonus;
    }

    @Post('bowling-score/strikes')
    calculateStrikes(@Body() frames: number[]): number {
        const score = new BowlingScore(frames);
        let totalStrikeBonus = 0;
        // La boucle parcourt les cadres un par un pour vérifier les strikes
        for (let i = 0; i < frames.length - 2; i++) {
            if (score.isStrike(i)) {
                totalStrikeBonus += score.calculateStrikeBonus(i);
            }
        }
        return totalStrikeBonus;
    }
}
