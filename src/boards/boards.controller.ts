import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('Board');
  constructor(private boardsService: BoardsService) {}

  @Get('/:id')
  async getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(
    @Body() dto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(
      `User ${user.username} createBoard, Payload:${JSON.stringify(dto)}`,
    );
    return this.boardsService.createBoard(dto, user);
  }
  @Delete('/:id')
  async deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.boardsService.deleteBoard(id);
  }
  @Delete('/my/:id')
  async deleteBoardByUser(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardsService.deleteBoardByUser(id, user);
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
  async getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
  @Get('/my')
  async getBoardsByUser(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} getBoardsByUser`);
    return this.boardsService.getBoardsByUser(user);
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
