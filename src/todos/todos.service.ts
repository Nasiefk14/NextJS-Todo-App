import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateTaskDto,
  Task,
  TaskResponse,
  UpdateTaskDto,
} from './schemas/todo.zod';
import mongoose from 'mongoose';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Task')
    private todoModel: mongoose.Model<Task>,
  ) {}

  private mapData(task: Task): TaskResponse {
    return {
      id: task._id.toString(),
      title: task.title,
      done: task.done ?? false,
      createdAt: task.createdAt.toISOString(),
      completedAt: task.completedAt ? task.completedAt.toISOString() : null,
    };
  }

  async getAll(done?: boolean): Promise<TaskResponse[]> {
    const filter: Partial<Pick<Task, 'done'>> =
      done !== undefined ? { done } : {};
    const res: Task[] = await this.todoModel
      .find(filter)
      .sort({ createdAt: -1 });

    return res.map((task) => this.mapData(task));
  }

  async getCompletedGrouped(): Promise<Record<string, TaskResponse[]>> {
    const tasks: Task[] = await this.todoModel
      .find({ done: true })
      .sort({ completedAt: -1 });
    const grouped: Record<string, TaskResponse[]> = {};

    tasks.forEach((task) => {
      if (!task.completedAt) return;
      const date = task.completedAt.toISOString().split('T')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(this.mapData(task));
    });

    return grouped;
  }

  async findById(id: string): Promise<TaskResponse> {
    const res: Task | null = await this.todoModel.findById(id);
    if (!res) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.mapData(res);
  }

  async create(todo: CreateTaskDto): Promise<TaskResponse> {
    const created: Task = await this.todoModel.create({
      title: todo.title,
      done: false,
      createdAt: new Date(),
      completedAt: null,
    });

    return this.mapData(created);
  }

  async updateById(id: string, todo: UpdateTaskDto): Promise<TaskResponse> {
    let completedAt: Date | undefined;

    if (todo.done) {
      completedAt = todo.completedAt ? new Date(todo.completedAt) : new Date();
    } else {
      completedAt = undefined;
    }
    
    const updateData: Partial<Task> = {
      done: todo.done,
      completedAt,
    };

    const res: Task | null= await this.todoModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!res) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.mapData(res);
  }

  async deleteById(id: string): Promise<TaskResponse> {
    const res: Task | null = await this.todoModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.mapData(res);
  }
}
