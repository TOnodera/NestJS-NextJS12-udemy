import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodoService } from './todo.service';
import { Task } from '@prisma/client';
import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTasks(@Req() req: Request): Promise<Task[]> {
    return await this.todoService.getTasks(req.user?.id);
  }

  @Get(':id')
  async getTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    return this.todoService.getTaskById(req.user?.id, taskId);
  }

  @Post()
  async createTask(
    @Req() req: Request,
    @Body() dto: CreateTaskDto,
  ): Promise<Task> {
    return await this.todoService.creatTask(req.user?.id, dto);
  }

  @Patch(':id')
  async updateTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.todoService.updateTaskById(req.user?.id, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<void> {
    return await this.todoService.deleteTaskById(req.user?.id, taskId);
  }
}
