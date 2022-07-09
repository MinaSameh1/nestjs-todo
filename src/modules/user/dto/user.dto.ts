import { IsOptional, IsString } from 'class-validator'

export class UserInputDTO {
  @IsString()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  pass: string

  @IsString()
  @IsOptional()
  firstName: string

  @IsString()
  @IsOptional()
  lastName: string
}
