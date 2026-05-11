import {z} from 'zod'

export const TodoSchema = z.object ({
    id: z.uuid(),
    title: z.string().trim().min(1).max(200),
    completed: z.boolean(),
    createdAt: z.iso.datetime(),
    updatedAt : z.iso.datetime() 
});

export const CreateTodoBodySchema = z.object ({
    title: z.string().trim().min(1).max(200)
});

export const UpdateTodoBodySchema = z.object({
  title: z.string().trim().min(1).max(200).optional(),
  completed: z.boolean().optional(),
})
.strict()
.refine(
  (data) => data.title !== undefined || data.completed !== undefined,
  { message: "Au moins un champ (title ou completed) doit être fourni" }
);

export const ListTodosQuerySchema = z.object ({
    completed: z.preprocess((val) => {
        if(val == 'true') return true;
        if(val == 'false') return false;
        return val;
    }, z.boolean().optional()),
    search : z.string().optional(),
});

export const IdParamsSchema = z.object ({
    id : z.uuid(),
})

export type Todo =  z.infer<typeof TodoSchema>
export type CreateTodoInput = z.infer<typeof CreateTodoBodySchema>
export type UpdateTodoInput = z.infer<typeof UpdateTodoBodySchema>
export type ListTodosQuerySchema=z.infer<typeof ListTodosQuerySchema>