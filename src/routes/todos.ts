import { Router } from 'express';
import { store } from '../store.js';
import { 
  CreateTodoBodySchema, 
  UpdateTodoBodySchema, 
  ListTodosQuerySchema, 
  IdParamsSchema 
} from '../schemas.js';
import { filterTodos, sortTodos } from '../helper.js';
const router = Router();

router.get('/', (req, res) => {
  const query = ListTodosQuerySchema.parse(req.query);
  const all = store.list();
  const filtered = filterTodos(all, query);
  res.json(sortTodos(filtered));
});

router.get('/:id', (req, res) => {
  const { id } = IdParamsSchema.parse(req.params);
  res.json(store.get(id));
});

router.post('/', (req, res) => {
  const body = CreateTodoBodySchema.parse(req.body);
  const todo = store.create(body);
  res.status(201).json(todo);
});

router.patch('/:id', (req, res) => {
  const { id } = IdParamsSchema.parse(req.params);
  const body = UpdateTodoBodySchema.parse(req.body);
  res.json(store.update(id, body));
});

router.delete('/:id', (req, res) => {
  const { id } = IdParamsSchema.parse(req.params);
  store.delete(id);
  res.status(204).send();
});

export default router;