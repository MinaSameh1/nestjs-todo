import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put
} from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators'
import { ToDoService } from './todo.service'
import { ToDoDTO, ToDoPatchDTO } from './dto'
import { ParseStartAndEndTime } from 'src/common/pipes'

@Controller('todo')
export class ToDoController {
  constructor(private todoService: ToDoService) {}

  @Get()
  async getTodos(@GetCurrentUserId() userId: number) {
    return await this.todoService.getTodo(userId)
  }

  @Patch(':toDoId')
  async patchTodo(
    @Body(new ParseStartAndEndTime()) input: ToDoPatchDTO,
    @Param('toDoId', new ParseIntPipe()) toDoId: number
  ) {
    return this.todoService.patchTodo(input, Number(toDoId))
  }

  @Put(':toDoId')
  async updateToDo(
    @Body(new ParseStartAndEndTime()) input: ToDoDTO,
    @Param('toDoId', new ParseIntPipe()) toDoId: number
  ) {
    return await this.todoService.updateToDo(input, toDoId)
  }

  @Post()
  async createTodo(@GetCurrentUserId() userId: number, @Body() input: ToDoDTO) {
    return await this.todoService.createToDo(input, userId)
  }

  @Delete(':toDoId')
  async deleteTodo(@Param('toDoId', new ParseIntPipe()) toDoId: number) {
    return await this.todoService.deleteToDo(toDoId)
  }
}
