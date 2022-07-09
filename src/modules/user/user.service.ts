import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserInputDTO } from './dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getSelf(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })
    delete user.pass
    delete user.hashedRefreshToken
    return user
  }

  update(id: number, input: UserInputDTO) {
    return this.prisma.user.update({
      data: input,
      where: {
        id: id
      }
    })
  }
}
