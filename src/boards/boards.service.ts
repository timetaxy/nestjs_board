import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuid } from 'uuid';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) throw new NotFoundException(`Can't find board.${id}`);
    return found;
  }
  async createBoard(dto: CreateBoardDto): Promise<Board> {
    // const { title, description } = dto;
    // const board: Board = this.boardRepository.create({
    //   //객체생성
    //   title,
    //   description,
    //   status: BoardStatus.PUBLIC,
    // });
    // await this.boardRepository.save(board); //저장
    // return board;
    return this.boardRepository.createBoard(dto);
  }

  /**
  private boards: Board[] = [];
  getAllBoards(): Board[] {
    return this.boards;
  }
  createBoard(dto: CreateBoardDto) {
    // createBoard(title: string, description: string) {
    const { title, description } = dto;
    const board: Board = {
      // title: title,
      // description: description,
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }
  getBoardById(id: string): Board {
    // return this.boards.find((board): boolean => board.id === id);
    const found = this.boards.find((board): boolean => board.id === id);
    if (!found) throw new NotFoundException(`Can't find board.${id}`);
    return found;
  }
  deleteBoard(id: string): void {
    const found = this.getBoardById(id);
    this.boards = this.boards.filter((board): boolean => board.id !== found.id);
    //같으면 지움
  }
  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
   */
}
