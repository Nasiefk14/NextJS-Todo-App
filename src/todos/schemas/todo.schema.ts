import { Schema } from 'mongoose';

export const TaskMongooseSchema = new Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  createdAt: { type: Date, required: true },
  completedAt: { type: Date },
});