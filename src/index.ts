import { Hono } from 'hono';
import { v4 as uuidv4 } from 'uuid';

const app = new Hono();

type TodoType = {
  title: string;
  desc: string;
  id: string;
  completed: boolean;
};

let todos: TodoType[] = [
  {
    id: "677740ac-0391-4903-8875-161d5d210b54",
    title: "Complete Project 0",
    desc: "Complete the todo using hono library for serverless function",
    completed: false,
  },
  {
    id: "d4cfd162-ea56-4be6-a5c6-6120f148748f",
    title: "Complete Project 1",
    desc: "Complete the todo using hono library for serverless function",
    completed: false,
  },
  {
    id: "8d9e6602-7f6b-4ce3-bb9d-37f997358431",
    title: "Complete Project 2",
    desc: "Complete the todo using hono library for serverless function",
    completed: false,
  },
  {
    id: "c675f72f-3ff1-4607-8c47-a27c306fdf58",
    title: "Complete Project 3",
    desc: "Complete the todo using hono library for serverless function",
    completed: false,
  },
  {
    id: "a0087c0e-d31a-47ac-9b07-4bf80afe6acc",
    title: "Complete Project 4",
    desc: "Complete the todo using hono library for serverless function",
    completed: false,
  },
  {
    id: "dfbdabc4-7763-4cfc-b76b-ccfb433a540d",
    title: "Complete Project 5",
    desc: "Complete the todo using hono library for serverless function",
    completed: false,
  },
];


// Get todos
app.get('/api/v1/todos', async (c) => {
  return c.json(todos);
});

// Get todo
app.get('/api/v1/todos/:id', async (c) => {
  const todoId = c.req.param('id');
  const filtered = todos.filter((todo) => todo.id === todoId);
  return c.json({ todo: filtered[0] });
});

// Add todo
app.post('/api/v1/todos', async (c) => {
  const body = await c.req.parseBody();
  const todo: TodoType = {
    id: uuidv4(),
    title: body.title,
    desc: body.desc,
    completed: false,
  };
  todos.push(todo);
  return c.json({
    message: 'Todo added',
  });
});

// Update Todo
app.put('/api/v1/todos/:id', async (c) => {
  const todoId = c.req.param('id');
  const updated = todos.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, completed: true };
    }
    return todo;
  });
  return c.json({
    todos: updated,
    message: 'Todo updated',
  });
});

// Delete Todo
app.delete('/api/v1/todos/:id', async (c) => {
  const todoId = c.req.param('id');
  const filtered = todos.filter((todo) => todo.id !== todoId);
  todos = filtered;
  return c.json({ message: 'Deleted successfully' });
});

export default app