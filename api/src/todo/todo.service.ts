import { ForbiddenException, Get, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async getTasks(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getTaskById(userId: number, taskId: number): Promise<Task> {
    return this.prisma.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });
  }

  async creatTask(userId: number, dto: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        userId,
        ...dto,
      },
    });
    return task;
  }

  async updateTaskById(
    userId: number,
    taskId: number,
    dto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task || task.userId !== userId) {
      throw new ForbiddenException('No permission to update.');
    }

    return await this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTaskById(userId: number, taksId: number): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taksId,
      },
    });

    if (!task || task.userId !== userId) {
      throw new ForbiddenException('No permission to delete.');
    }

    await this.prisma.task.delete({
      where: {
        id: taksId,
      },
    });
  }
}
