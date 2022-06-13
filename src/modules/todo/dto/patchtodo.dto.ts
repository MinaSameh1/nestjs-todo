import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'
import { color, ToDo } from '../types'

export class ToDoPatchDTO implements ToDo {
  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsOptional()
  @IsDateString()
  startTime?: Date

  @IsOptional()
  @IsDateString()
  endTime?: Date

  @IsEnum(color)
  @IsOptional()
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
