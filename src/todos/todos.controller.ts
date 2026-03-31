import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateTaskSchema,
  TaskResponse,
  UpdateTaskSchema,
} from './schemas/todo.zod';
import { TodosService } from './todos.service';
import { ZodError } from 'zod';

@Controller('api/tasks')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  async getAllTodos(@Query('done') done?: string): Promise<TaskResponse[]> {
    const isDone: boolean | undefined = done === 'true' ? true : done === 'false' ? false : undefined;

    return this.todoService.getAll(isDone);
  }

  @Get('completed')
  async getCompleted(): Promise<Record<string, TaskResponse[]>> {
    return this.todoService.getCompletedGrouped();
  }

  @Get(':id')
  async getTodoById(@Param('id') id: string): Promise<TaskResponse> {
    return this.todoService.findById(id);
  }

  @Post()
  async createTodo(@Body() body: any): Promise<TaskResponse> {
    try {
      const parsed: {
        title: string;
    } = CreateTaskSchema.parse(body);
      return this.todoService.create(parsed);
    } catch (error: any) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        );
      }
      throw error;
    }
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() body: unknown,
  ): Promise<TaskResponse> {
    try {
      const parsed: {
        done: boolean;
        completedAt?: Date | undefined;
    } = UpdateTaskSchema.parse(body);
      return this.todoService.updateById(id, parsed);
    } catch (error: any) {
      if (error instanceof ZodError) {
        throw new BadRequestException(
          error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        );
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTodoById(@Param('id') id: string): Promise<void> {
    await this.todoService.deleteById(id);
  }
}