import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { AuthCreateDto, AuthInputDto } from './dto'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { jwtPayload, Tokens } from './types'

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
        if (error.code === 'P2002') {
          // Duplicate field
          throw new ForbiddenException('Email or Username taken')
        }
      }
      throw error
    }
  }

  async login(input: AuthInputDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: input.email
      }
    })
    if (!user) throw new ForbiddenException('Wrong Credentials')
    const passMatch = await argon.verify(user.pass, input.pass)
    if (!passMatch) throw new ForbiddenException('Wrong Credentials')


    const tokens = await this.signTokens(user.id, user.email)
    this.updateRefreshToken(user.id, tokens.refreshToken)
    return tokens
  }

  async logout(userId: number) {
    return await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRefreshToken: {
          not: null
        }
      },
      data: {
        hashedRefreshToken: null
      }
    })
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException('Access Denied')

    const refreshTokenMatch = await argon.verify(user.hashedRefreshToken, rt)
    if (!refreshTokenMatch) throw new ForbiddenException('Access Denied')

    const tokens = await this.signTokens(user.id, user.email)
    await this.updateRefreshToken(user.id, tokens.refreshToken)

    return tokens
  }

  async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await argon.hash(refreshToken)
    await this.prisma.user.update({
      where: {
        id: userId
      },
      data: {
        hashedRefreshToken: hashedRefreshToken
      }
    })
  }

  async signTokens(userId: number, email: string): Promise<Tokens> {
    const payload: jwtPayload = {
      id: userId,
      email
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET')
      }),
      this.jwt.signAsync(payload, {
        expiresIn: '30d',
        secret: this.config.get('JWT_SECRET')
      })
    ])

    return {
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  }
}
