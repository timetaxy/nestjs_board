import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
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
  async createBoard(dto: CreateBoardDto, user: User): Promise<Board> {
    // const { title, description } = dto;
    // const board: Board = this.boardRepository.create({
    //   //객체생성
    //   title,
    //   description,
    //   status: BoardStatus.PUBLIC,
    // });
    // await this.boardRepository.save(board); //저장
    // return board;
    return this.boardRepository.createBoard(dto, user);
  }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    // {raw:[],affected:0}
    if (result.affected === 0)
      throw new NotFoundException(`Can't find and delete id:${id}`);
  }
  async deleteBoardByUser(id: number, user: User): Promise<void> {
    // const board = await this.getBoardsByUser(user);
    const result = await this.boardRepository.delete({ id, user });
    if (result.affected === 0)
      throw new NotFoundException(`Can't delete board : ${id}`);
  }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    //or
    // await this.boardRepository.update(id, board);
    return board;
  }
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getBoardsByUser(user: User): Promise<Board[]> {
    const qry = this.boardRepository.createQueryBuilder('board');
    qry.where('board.userId=:userId', { userId: user.id });
    const boards = await qry.getMany();
    return boards;
    // return this.boardRepository.find();
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
