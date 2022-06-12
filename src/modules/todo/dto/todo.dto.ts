import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class ToDoCreateDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsDate()
  time: Date
}
