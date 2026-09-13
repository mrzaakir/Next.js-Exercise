import { ObjectId } from "mongodb";
import type { CreateTodoInput, Todo, TodoFilters, TodoPriority, UpdateTodoInput } from "../types/todo";
import { getTodoCollection } from "./db";

const priorityRank: Record<TodoPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
} as const;

export async function fetchTodos(filters: TodoFilters = {}): Promise<Todo[]> {
  try {
    const collection = await getTodoCollection();
    const query: Record<string, unknown> = {};

    if (filters.status === "completed") {
      query.completed = true;
    }

    if (filters.status === "active") {
      query.completed = false;
    }

    if (filters.search) {
      query.title = { $regex: filters.search, $options: "i" };
    }

    const todos = await collection.find(query).toArray();

    return todos
      .map((todo) => {
        const priority = (todo.priority ?? "medium") as TodoPriority;

        return {
          _id: todo._id.toString(),
          title: todo.title,
          completed: Boolean(todo.completed),
          priority,
          createdAt: todo.createdAt?.toISOString?.() ?? new Date().toISOString(),
          updatedAt: todo.updatedAt?.toISOString?.(),
        };
      })
      .sort((a, b) => {
        const priorityDelta = priorityRank[b.priority] - priorityRank[a.priority];
        if (priorityDelta !== 0) return priorityDelta;
        if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed);
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export async function fetchTodoById(id: string): Promise<Todo | null> {
  try {
    const collection = await getTodoCollection();
    const todo = await collection.findOne({ _id: new ObjectId(id) });

    if (!todo) {
      return null;
    }

    const priority = (todo.priority ?? "medium") as TodoPriority;

    return {
      _id: todo._id.toString(),
      title: todo.title,
      completed: Boolean(todo.completed),
      priority,
      createdAt: todo.createdAt?.toISOString?.() ?? new Date().toISOString(),
      updatedAt: todo.updatedAt?.toISOString?.(),
    };
  } catch (error) {
    console.error("Error fetching todo by id:", error);
    return null;
  }
}

export async function createTodo(todo: CreateTodoInput): Promise<string | null> {
  try {
    const collection = await getTodoCollection();
    const result = await collection.insertOne({
      ...todo,
      priority: todo.priority ?? "medium",
      completed: Boolean(todo.completed),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating todo:", error);
    return null;
  }
}

export async function updateTodo(id: string, todo: UpdateTodoInput): Promise<boolean> {
  try {
    const collection = await getTodoCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...todo,
          priority: todo.priority ?? "medium",
          updatedAt: new Date(),
        },
      },
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error("Error updating todo:", error);
    return false;
  }
}

export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const collection = await getTodoCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error deleting todo:", error);
    return false;
  }
}

export async function bulkDeleteTodos(ids: string[]): Promise<number> {
  try {
    if (ids.length === 0) return 0;
    const collection = await getTodoCollection();
    const result = await collection.deleteMany({
      _id: { $in: ids.map((id) => new ObjectId(id)) },
    });
    return result.deletedCount;
  } catch (error) {
    console.error("Error bulk deleting todos:", error);
    return 0;
  }
}

export async function bulkUpdateStatus(ids: string[], completed: boolean): Promise<number> {
  try {
    if (ids.length === 0) return 0;
    const collection = await getTodoCollection();
    const result = await collection.updateMany(
      { _id: { $in: ids.map((id) => new ObjectId(id)) } },
      { $set: { completed, updatedAt: new Date() } },
    );
    return result.modifiedCount;
  } catch (error) {
    console.error("Error bulk updating statuses:", error);
    return 0;
  }
}
