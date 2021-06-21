import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
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
}
