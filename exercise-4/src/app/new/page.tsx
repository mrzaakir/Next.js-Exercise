import Link from "next/link";
import NewTodoForm from "../components/NewTodoForm";

export default function NewTodoPage() {
  return (
    <main className="mx-auto mt-10 max-w-2xl p-6">
      <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-slate-200">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Add New Todo</h1>
          <Link href="/" className="text-rose-600 transition-colors hover:text-rose-800">
            ← Back to Todos
          </Link>
        </div>

        <NewTodoForm />
      </div>
    </main>
  );
}
