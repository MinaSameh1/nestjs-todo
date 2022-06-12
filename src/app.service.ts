import { Injectable } from '@nestjs/common'
import { PrismaService } from './modules/prisma/prisma.service'

@Injectable()
export class AppService {
  // TODO: Move this to a better place
  constructor(private prisma: PrismaService) {
    // Middleware to log querys
    this.prisma.$use(async (params, next) => {
      const before = Date.now()

      const result = await next(params)

      const after = Date.now()

      console.log(
        `Query ${params.model}.${params.action} took ${after - before}ms`
      )

      return result
    })
  }
}
