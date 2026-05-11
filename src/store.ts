import { randomUUID } from 'crypto';
import type { Todo, CreateTodoInput, UpdateTodoInput } from './schemas.js';

export class NotFoundError extends Error {
  constructor(id: string) {
    super(`Todo avec l'ID ${id} non trouvé`);
    this.name = 'NotFoundError';
  }
}

const todoStore = new Map<string, Todo>();

export const store = {
  list: (): Todo[] => Array.from(todoStore.values()),
  
  get: (id: string): Todo => {
    const todo = todoStore.get(id);
    if (!todo) throw new NotFoundError(id);
    return todo;
  },

  create: (input: CreateTodoInput): Todo => {
    const now = new Date().toISOString();
    const newTodo = {
      id: randomUUID(),
      title: input.title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    todoStore.set(newTodo.id, newTodo);
    return newTodo;
  },

  update: (id: string, patch: UpdateTodoInput): Todo => {
    const existing = store.get(id);
    const updated = { 
      ...existing, 
      ...patch, 
      updatedAt: new Date().toISOString()
    };
    todoStore.set(id, updated);
    return updated;
  },

  delete: (id: string): void => {
    if (!todoStore.has(id)) throw new NotFoundError(id);
    todoStore.delete(id);
  },

  reset: (): void => {
    todoStore.clear();
  },
};