import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BowlingScore } from './bowling.score';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('bowling-score')
  calculateScore(@Body() frames: number[]): number {
    const score = new BowlingScore(frames);
    return score.calculateTotalScore();
  }
}