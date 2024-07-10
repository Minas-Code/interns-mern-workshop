import { z } from 'zod';

const displayToEnum = {
  Pending: 'PENDING',
  'In Progress': 'IN_PROGRESS',
  Completed: 'COMPLETED',
};

export const createTaskSchema = z
  .object({
    title: z.string().min(1, 'Title is required').min(3, 'Title is too short').max(10, 'Title is too long'),
    description: z.string().min(1, 'Description is required'),
    status: z.enum(['Pending', 'In Progress', 'Completed']).transform((val) => displayToEnum[val]),
  })
  .required();

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;
