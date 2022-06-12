import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put
} from '@nestjs/common'
import { GetCurrentUserId } from 'src/common/decorators'
import { ToDoService } from './todo.service'
import { ToDoDTO } from './dto'

@Controller('todo')
export class ToDoController {
  constructor(private todoService: ToDoService) {}

  @Get()
  async getTodos(@GetCurrentUserId() userId: number) {
    return await this.todoService.getTodo(userId)
  }

  @Put(':toDoId')
  async updateToDo(@Body() input: ToDoDTO, @Param('toDoId') toDoId: string) {
    return await this.todoService.updateToDo(input, Number.parseInt(toDoId))
  }

  @Post()
  async createTodo(@GetCurrentUserId() userId: number, @Body() input: ToDoDTO) {
    return await this.todoService.createToDo(input, userId)
  }

  @Delete(':toDoId')
  async deleteTodo(@Param('toDoId') toDoId: string) {
    return await this.todoService.deleteToDo(Number.parseInt(toDoId))
  }
}
