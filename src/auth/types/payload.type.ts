export interface jwtPayload {
  id: number
  email: string
}

export type jwtPayload_refresh = jwtPayload & { refreshToken: string }
