import Link from "next/link";
import { notFound } from "next/navigation";
import { updateTodoAction } from "../../actions/update";
import { fetchTodoById } from "../../lib/todo";

interface EditTodoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { id } = await params;
  const todo = await fetchTodoById(id);

  if (!todo) {
    notFound();
  }

  return (
    <main className="mx-auto mt-10 max-w-2xl p-6">
      <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-slate-200">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Edit Todo</h1>
          <Link href="/" className="text-blue-600 transition-colors hover:text-blue-800">
            ← Back to Todos
          </Link>
        </div>

        <form action={updateTodoAction} className="space-y-4">
          <input type="hidden" name="id" value={todo._id} />

          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700">
              Todo Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={todo.title}
              placeholder="Enter your todo..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength={200}
              autoFocus
            />
            <p className="mt-1 text-xs text-slate-500">Maximum 200 characters</p>
          </div>

          <div>
            <label htmlFor="priority" className="mb-2 block text-sm font-medium text-slate-700">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue={todo.priority}
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Status:</span> {todo.completed ? "Completed" : "Pending"}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              <span className="font-medium">Created:</span> {new Date(todo.createdAt).toLocaleDateString()}
            </p>
            {todo.updatedAt && (
              <p className="mt-1 text-sm text-slate-600">
                <span className="font-medium">Last updated:</span> {new Date(todo.updatedAt).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Update Todo
            </button>
            <Link
              href="/"
              className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
