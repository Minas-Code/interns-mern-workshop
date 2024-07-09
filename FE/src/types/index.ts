import { TodoStatus } from '@/lib/enum';
import { type UniqueIdentifier } from '@dnd-kit/core';

export type GlobalApiResponse<T = any> = {
  success: boolean;
  data: {
    message: string;
    result: T;
  };
};

export interface Column {
  id: UniqueIdentifier;
  title: string;
}
export const defaultCols = [
  {
    id: 'PENDING' as const,
    title: 'Pending',
  },
  {
    id: 'IN_PROGRESS' as const,
    title: 'In progress',
  },
  {
    id: 'COMPLETED' as const,
    title: 'Completed',
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]['id'];

export type TodoList = {
  id: string;
  title: string;
  description: string;
  status: ColumnId;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
