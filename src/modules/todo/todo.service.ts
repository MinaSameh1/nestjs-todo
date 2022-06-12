import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service";
import { ToDoCreateDTO } from './dto'

@Injectable()
export class ToDoService {
  constructor(private prisma: PrismaService) { }

  getTodo(userId: number) {
    return this.prisma.toDo.findMany({
      where: {
        userId: userId
      }
    })
  }

  createToDo(input: ToDoCreateDTO, userId: number) {
    return this.prisma.toDo.create({
      data: {
        ...input,
        userId: userId
      }
    })
  }

  deleteToDo(toDoId: number) {
    return this.prisma.toDo.delete({
      where: {
        id: toDoId
      }
    })
  }
}
