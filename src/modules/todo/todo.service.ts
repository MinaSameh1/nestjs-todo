import { Injectable } from '@nestjs/common'
import { getColorEnumValue } from 'src/common/utils/getEnumValue.util'
import { PrismaService } from '../prisma/prisma.service'
import { ToDoDTO } from './dto'

@Injectable()
export class ToDoService {
  constructor(private prisma: PrismaService) {}

  getTodo(userId: number) {
    return this.prisma.toDo.findMany({
      where: {
        userId: userId
      }
    })
  }

  updateToDo(input: ToDoDTO, toDoId: number) {
    return this.prisma.toDo.update({
      data: input,
      where: {
        id: toDoId
      }
    })
  }

  createToDo(input: ToDoDTO, userId: number) {
    return this.prisma.toDo.create({
      data: {
        ...input,
        color: getColorEnumValue(input.color),
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
