import { color } from './color.type'

export interface ToDo {
  title?: string
  description?: string
  startTime?: Date
  endTime?: Date
  color?: color
  isCompleted?: boolean
  remindTime?: number
  repeat?: string
}

export interface inputTodo {
  title?: string
  description?: string
  startTime?: string
  endTime?: string
  color?: color
  isCompleted?: boolean
  remindTime?: number
  repeat?: string
}
