"use client";

import { useActionState } from "react";
import { createTodoAction, type CreateTodoFormState } from "../actions/create";

const initialState: CreateTodoFormState = {};

export default function NewTodoForm() {
  const [state, formAction, isPending] = useActionState(createTodoAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700">
          Todo Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter your todo..."
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-500"
          required
          maxLength={200}
          autoFocus
          aria-invalid={Boolean(state?.error)}
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
          defaultValue="medium"
          className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {state?.error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-md bg-rose-600 px-4 py-2 font-medium text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-rose-400"
        >
          {isPending ? "Creating..." : "Create Todo"}
        </button>

        <a
          href="/"
          className="rounded-md border border-slate-300 px-4 py-2 text-slate-700 transition-colors hover:bg-slate-50"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
