import { z } from 'zod';
import { TodoStatus } from './enum';

export const createTaskSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    status: z.nativeEnum(TodoStatus).default(TodoStatus.PENDING),
  })
  .required();

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;
