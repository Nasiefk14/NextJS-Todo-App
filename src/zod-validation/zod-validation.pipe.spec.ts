import { TaskSchema } from 'src/todos/schemas/todo.zod';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
  it('should be defined', () => {
    expect(new ZodValidationPipe(TaskSchema)).toBeDefined();
  });
});
