import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskMongooseSchema } from './schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskMongooseSchema }]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
