import { CreateTodoBodySchema, UpdateTodoBodySchema, IdParamsSchema } from '../../src/schemas.js';

describe('Schemas Validation', () => {
  describe('CreateTodoBodySchema', () => {
    it('devrait accepter un titre valide', () => {
      const result = CreateTodoBodySchema.safeParse({ title: 'Acheter du lait' });
      expect(result.success).toBe(true);
    });

    it('devrait rejeter un titre trop court ou vide', () => {
      expect(CreateTodoBodySchema.safeParse({ title: '' }).success).toBe(false);
      expect(CreateTodoBodySchema.safeParse({ title: '   ' }).success).toBe(false);
    });

    it('devrait rejeter si le champ est manquant ou du mauvais type', () => {
      expect(CreateTodoBodySchema.safeParse({}).success).toBe(false);
      expect(CreateTodoBodySchema.safeParse({ title: 123 }).success).toBe(false);
    });
  });

  describe('UpdateTodoBodySchema', () => {
    it('devrait rejeter un objet vide (au moins un champ requis)', () => {
      const result = UpdateTodoBodySchema.safeParse({});
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Au moins un champ');
      }
    });

    it('devrait rejeter des champs extra (strict)', () => {
      const result = UpdateTodoBodySchema.safeParse({ title: 'New', admin: true });
      expect(result.success).toBe(false);
    });
  });

  describe('IdParamsSchema', () => {
    it('devrait rejeter un ID qui n\'est pas un UUID', () => {
      expect(IdParamsSchema.safeParse({ id: '123' }).success).toBe(false);
      expect(IdParamsSchema.safeParse({ id: 'not-a-uuid' }).success).toBe(false);
    });
  });
});