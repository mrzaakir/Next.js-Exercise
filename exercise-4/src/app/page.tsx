import Link from "next/link";
import { bulkDeleteAction, bulkToggleAction } from "./actions/bulk";
import { deleteTodo } from "./actions/delete";
import { toggleTodo } from "./actions/toggle";
import { searchTodosAction } from "./actions/search";
import { fetchTodos } from "./lib/todo";

function formatRelativeTime(date: string) {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMs / 60000));

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `created ${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `created ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `created ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function getPriorityColor(priority: "low" | "medium" | "high") {
  return {
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  }[priority];
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; status?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const search = params.search ?? "";
  const status = params.status ?? "all";
  const todos = await fetchTodos({ search, status: status as "all" | "active" | "completed" });

  const selectedIds = todos.map((todo) => todo._id).join(",");

  return (
    <main className="mx-auto mt-10 max-w-5xl p-6">
      <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">📝 Todo App</h1>
            <p className="mt-2 text-sm text-slate-500">Last updated: {new Date().toLocaleTimeString()}</p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/new"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              ➕ Add New Todo
            </Link>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <form action={searchTodosAction} className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search todos..."
              className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            <select
              name="status"
              defaultValue={status}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <button type="submit" className="rounded-md bg-slate-800 px-4 py-2 font-medium text-white hover:bg-slate-900">
              Search
            </button>
          </form>
        </div>

        {todos.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
            <p className="text-lg text-slate-500">No todos yet!</p>
            <p className="mt-2 text-sm text-slate-400">Create your first todo to get started.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <form action={bulkDeleteAction} className="inline-flex">
                <input type="hidden" name="ids" value={selectedIds} />
                <button type="submit" className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700">
                  Delete Selected
                </button>
              </form>
              <form action={bulkToggleAction} className="inline-flex">
                <input type="hidden" name="ids" value={selectedIds} />
                <input type="hidden" name="completed" value="true" />
                <button type="submit" className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                  Mark All Complete
                </button>
              </form>
            </div>

            <div className="space-y-3">
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" value={todo._id} className="h-4 w-4 rounded border-slate-300" />

                    <form action={toggleTodo.bind(null, todo._id)}>
                      <button
                        type="submit"
                        className="text-2xl transition-transform hover:scale-110"
                        title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {todo.completed ? "✅" : "⬜"}
                      </button>
                    </form>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-lg ${
                            todo.completed ? "text-slate-500 line-through" : "text-slate-800"
                          }`}
                        >
                          {todo.title}
                        </span>
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(todo.priority)}`}>
                          {todo.priority}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatRelativeTime(todo.createdAt)}
                        {todo.updatedAt ? ` • updated ${formatRelativeTime(todo.updatedAt)}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/edit/${todo._id}`}
                      className="rounded-md p-2 text-blue-600 transition-colors hover:bg-blue-100"
                      title="Edit todo"
                    >
                      ✏️
                    </Link>

                    <form action={deleteTodo.bind(null, todo._id)}>
                      <button
                        type="submit"
                        className="rounded-md p-2 text-red-600 transition-colors hover:bg-red-100"
                        title="Delete todo"
                      >
                        🗑️
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
