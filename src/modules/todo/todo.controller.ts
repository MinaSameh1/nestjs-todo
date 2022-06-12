import { Controller } from "@nestjs/common";
import { ToDoService } from "./todo.service";

@Controller('todo')
export class ToDoController {
  constructor(private todoService: ToDoService) {}


}
