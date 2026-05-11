import { filterTodos, sortTodos } from '../../src/helper.js';
import type { Todo } from '../../src/schemas.js';

const mockTodos: Todo[] = [
  { id: 'u1', title: 'Alpha', completed: true, createdAt: '2026-05-01T10:00:00Z', updatedAt: '2026-05-01T10:00:00Z' },
  { id: 'u2', title: 'Beta', completed: false, createdAt: '2026-05-02T10:00:00Z', updatedAt: '2026-05-02T10:00:00Z' },
  { id: 'u3', title: 'Gamma', completed: true, createdAt: '2026-05-02T10:00:00Z', updatedAt: '2026-05-02T10:00:00Z' },
];

describe('Helpers', () => {
  describe('filterTodos', () => {
    it('devrait filtrer par statut complété', () => {
      const result = filterTodos(mockTodos, { completed: true });
      expect(result).toHaveLength(2);
      expect(result.every(t => t.completed)).toBe(true);
    });

    it('devrait filtrer par recherche textuelle (insensible à la casse)', () => {
      const result = filterTodos(mockTodos, { search: 'alPHa' });
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Alpha');
    });

    it('devrait combiner les filtres', () => {
      const result = filterTodos(mockTodos, { completed: true, search: 'Gamma' });
      expect(result).toHaveLength(1);
    });
  });

  describe('sortTodos', () => {
    it('devrait trier du plus récent au plus ancien', () => {
      const result = sortTodos(mockTodos);
      expect(result[0].id).toBe('u2'); 
    });

    it('devrait utiliser l\'ID comme tie-break si les dates sont égales', () => {
      const sameDates = [
        { ...mockTodos[1], id: 'z' },
        { ...mockTodos[2], id: 'a' }
      ];
      const result = sortTodos(sameDates);
      expect(result[0].id).toBe('a');
    });
  });
});