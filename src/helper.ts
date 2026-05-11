import type {Todo} from './schemas.js';

export const filterTodos = (
  todos: Todo[], 
  { completed, search }: { completed?: boolean; search?: string }
): Todo[] => {
  return todos.filter((todo) => {
    const matchesStatus =
      completed === undefined || ('completed' in todo && todo.completed === completed);
    const matchesSearch = !search || todo.title.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });
};

export const sortTodos = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => {
    if ('createdAt' in a && 'createdAt' in b) {
      const aCreated = a.createdAt;
      const bCreated = b.createdAt;

      if (
        (typeof aCreated === 'string' || typeof aCreated === 'number') &&
        (typeof bCreated === 'string' || typeof bCreated === 'number')
      ) {
        const dateDiff = new Date(bCreated).getTime() - new Date(aCreated).getTime();
        if (dateDiff !== 0) return dateDiff;
      }
    }

    if ('id' in a && 'id' in b) {
      return a.id.localeCompare(b.id);
    }
    return 0;
  });
};