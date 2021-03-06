import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'
import { color, ToDo } from '../types'

export class ToDoDTO implements ToDo {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsOptional()
  @IsDateString()
  startTime?: Date

  @IsOptional()
  @IsDateString()
  endTime?: Date

  @IsEnum(color)
  @IsNotEmpty()
  color: color

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean

  @IsOptional()
  @IsNumber()
  remindTime?: number

  @IsOptional()
  @IsString()
  repeat?: string
}
