import {
  IsBoolean,
  IsDate,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString
} from 'class-validator'
import { color } from '../types'

export class ToDoDTO {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsOptional()
  @IsDate()
  startTime?: Date

  @IsOptional()
  @IsDate()
  endTime?: Date

  @IsEnum(color)
  @IsNotEmpty()
  color: color

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean = false

  @IsOptional()
  @IsNumber()
  remindTime?: number

  @IsOptional()
  @IsString()
  repeat?: string
}
