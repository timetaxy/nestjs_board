import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(@Body() dto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(dto);
  }
  @Delete('/:id')
  async deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.boardsService.deleteBoard(id);
  }
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // @Body('status') status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
  /** 
  @Get('/')
  getAllBoards(): Board[] {
    return this.boardsService.getAllBoards();
  }
  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() dto: CreateBoardDto): Board {
    //body
    // createBoard(@Body() body): Board {
    //specific value of body
    // createBoard(@Body('title') title) {
    // console.log(body);
    // const { title, description } = body;
    return this.boardsService.createBoard(dto);
    // return this.boardsService.createBoard(title, description);
  }
  @Get('/:id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): void {
    this.boardsService.deleteBoard(id);
  }
  @Patch('/:id/status')
  updateBoardStatus(
    // updateBoardStatus(@Param() params): Board {
    // const { id, status } = params;
    @Param('id') id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // @Body('status') status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }
  */
}
