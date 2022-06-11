import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { AuthCreateDto, AuthInputDto } from './dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {
    /*
    NOTE: I decided against this,
     as there was no way to check if pass was modified, 
     meaning that the password could be hashed again.
    // Middleware to hash password
    this.prisma.$use(async (params, next) => {
      // If the model is user, and action is create or update
      if (
        params.model === 'User' &&
        (params.action === 'update' || params.action === 'create')
      ) {
        // Hash the password
        params.args.pass = argon.hash(params.args.pass)
      }
      // Continue normally
      return await next(params)
    })
    */
  }

  async login(input: AuthInputDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: input.email,
      }
    })
    if (!user) throw new ForbiddenException('Wrong Credentials')
    const passMatch = await argon.verify(user.pass, input.pass)
    if (!passMatch) throw new ForbiddenException('Wrong Credentials')

    // Remove the pass from object.
    delete user.pass
    return await this.signToken(user.id, user.email)
  }

  async signUp(input: AuthCreateDto) {
    try {
      input.pass = await argon.hash(input.pass)
      return await this.prisma.user.create({
        data: {
          ...input
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // Duplicate field
          throw new ForbiddenException('Email or Username taken')
        }
      }
      throw error
    }
  }

  async signToken(userId: number, email: string): 
  Promise<{ accessToken: string, refreshToken: string }> {
    const accessToken = await this.jwt.signAsync({
      id: userId,
      email
    }, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET')
    })

    const refreshToken = await this.jwt.signAsync({
      id: userId,
      email
    }, {
      expiresIn: '30d',
      secret: this.config.get('JWT_SECRET')
    })

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  }
}