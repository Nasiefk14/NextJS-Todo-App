import { z } from 'zod';

export const TaskSchema = z.object({
  _id: z.string(),
  title: z.string(),
  done: z.boolean(),
  createdAt: z.coerce.date(),
  completedAt: z.coerce.date().nullable(),
});
export type Task = z.infer<typeof TaskSchema>;

export const CreateTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
});
export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = z.object({
  done: z.boolean(),
  completedAt: z.date().optional(),
});
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;

export const TaskResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
  createdAt: z.string(),
  completedAt: z.string().nullable(),
});
export type TaskResponse = z.infer<typeof TaskResponseSchema>;