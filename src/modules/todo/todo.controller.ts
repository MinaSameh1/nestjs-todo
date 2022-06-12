import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { GetCurrentUserId } from "src/common/decorators";
import { ToDoService } from "./todo.service";
import { ToDoCreateDTO } from './dto'

@Controller('todo')
export class ToDoController {
  constructor(private todoService: ToDoService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getTodos(@GetCurrentUserId() userId: number) {
    return this.getTodos(userId)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTodo(
    @GetCurrentUserId() userId: number,
    @Body() input: ToDoCreateDTO
  ) {
    return await this.todoService.createToDo(input, userId)
  }

  @Delete(':toDoId')
  @HttpCode(HttpStatus.OK)
  async deleteTodo(@Param('toDoId') toDoId) {
    return await this.todoService.deleteToDo(toDoId)
  }
}
