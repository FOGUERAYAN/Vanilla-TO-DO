import { test, expect } from '@playwright/test';
import type { Todo } from '../../src/schemas.js';

test.describe('Todo API E2E', () => {
  
  test.beforeEach(async ({ request }) => {
    await request.post('/__test__/reset');
  });

  test('devrait créer, lire, modifier et supprimer un todo', async ({ request }) => {
    
    const createRes = await request.post('/todos', {
      data: { title: 'Tester Playwright' }
    });
    expect(createRes.status()).toBe(201);
    const todo = await createRes.json() as Todo;
    expect(todo.title).toBe('Tester Playwright');
    expect(todo.completed).toBe(false);

    const todoId = todo.id;

    
    const getRes = await request.get(`/todos/${todoId}`);
    expect(getRes.ok()).toBeTruthy();
    expect(await getRes.json()).toMatchObject({ id: todoId });

    
    const patchRes = await request.patch(`/todos/${todoId}`, {
      data: { completed: true }
    });
    expect(patchRes.ok()).toBeTruthy();
    const updated = await patchRes.json() as Todo;
    expect(updated.completed).toBe(true);
    expect(updated.updatedAt).not.toBe(updated.createdAt); // updatedAt doit avoir changé

    
    const deleteRes = await request.delete(`/todos/${todoId}`);
    expect(deleteRes.status()).toBe(204);

    
    const finalGet = await request.get(`/todos/${todoId}`);
    expect(finalGet.status()).toBe(404);
  });

  test('devrait renvoyer une erreur 400 si le titre est invalide', async ({ request }) => {
    const response = await request.post('/todos', {
      data: { title: '' } 
    });
    expect(response.status()).toBe(400);
    const body = await response.json() as { error: string };
    expect(body.error).toBe('Validation Error');
  });

  test('devrait filtrer les todos par statut', async ({ request }) => {
    
    await request.post('/todos', { data: { title: 'Fini' } });
    const res2 = await request.post('/todos', { data: { title: 'En cours' } });
    const todo2 = await res2.json() as Todo;
    await request.patch(`/todos/${todo2.id}`, { data: { completed: true } });

    const response = await request.get('/todos?completed=true');
    const todos = await response.json() as Todo[];
    expect(todos.every((t) => t.completed)).toBeTruthy();
  });
});