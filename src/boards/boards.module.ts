import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])],
  //forFeature: 모듈안에 레포지토리 등록
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
