import { ForbiddenException, Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ConfigService } from '@nestjs/config'
import { jwtPayload } from '../types'

// Refresh Token
@Injectable()
export class RtJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: config.get('JWT_SECRET'),
      passReqToCallback: true
    })
  }

  validate(req: Request, payload: jwtPayload) {
    const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim()

    if (!refreshToken) throw new ForbiddenException('Refresh Token malformed')

    return {
      ...payload,
      refreshToken: refreshToken
    }
  }
}
