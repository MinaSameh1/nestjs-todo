import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ToDo, inputTodo } from 'src/modules/todo/types'
import logger from '../utils/logger'

@Injectable()
export class ParseStartAndEndTime implements PipeTransform<inputTodo, ToDo> {
  transform(value: inputTodo, metadata: ArgumentMetadata): ToDo {
    try {
      // Assume that the date is correct, as it passed class-validator
      return {
        ...value,
        startTime: value.startTime ? new Date(value.startTime) : undefined,
        endTime: value.endTime ? new Date(value.endTime) : undefined
      }
    } catch(error) {
      logger.error('Something went wrong converting date')
      logger.error(error)
      throw new BadRequestException('')
    }
  }
}
