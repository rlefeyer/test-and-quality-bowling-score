import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BowlingScore } from './bowling.score';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });


  it('should calculate the total score for a game', () => {
    const frames = [5, 5, 3, 7, 6, 2, 8, 1, 9, 1];
    expect(appController.calculateScore(frames)).toBe(47);
  });

});
