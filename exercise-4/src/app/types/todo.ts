export type TodoPriority = "low" | "medium" | "high";

export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: string;
  updatedAt?: string;
};

export type CreateTodoInput = {
  title: string;
  completed?: boolean;
  priority?: TodoPriority;
};

export type UpdateTodoInput = {
  title?: string;
  completed?: boolean;
  priority?: TodoPriority;
};

export type TodoFilters = {
  search?: string;
  status?: "all" | "active" | "completed";
};
