import { Todo as PrismaTodo, Priority } from '@prisma/client';

export type Todo = PrismaTodo;

export interface CreateTodoInput {
  title: string;
  description?: string;
  priority?: Priority;
  tags?: string[];
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: Priority;
  tags?: string[];
}

export interface GeminiResponse {
  response: string;
  error?: string;
}
