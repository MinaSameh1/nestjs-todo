import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ToDoService {
  constructor(private prisma: PrismaService) {}

}
