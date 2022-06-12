import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class AuthCreateDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 16)
  pass: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string
}

export class AuthInputDto {
  /*
   * The input to sign in
   * @public email string
   * @public pass string
   */
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 16)
  pass: string
}
