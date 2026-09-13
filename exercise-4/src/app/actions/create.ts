"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTodo } from "../lib/todo";

export type CreateTodoFormState = {
  error?: string;
};

export async function createTodoAction(
  _prevState: CreateTodoFormState | null,
  formData: FormData,
): Promise<CreateTodoFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const priority = String(formData.get("priority") ?? "medium");

  if (!title || title.length === 0) {
    return { error: "Title is required." };
  }

  if (title.length > 200) {
    return { error: "Title must be less than 200 characters." };
  }

  const validPriority =
    priority === "low" || priority === "medium" || priority === "high" ? priority : "medium";

  const todoId = await createTodo({ title, priority: validPriority });

  if (!todoId) {
    return { error: "Failed to create todo." };
  }

  revalidatePath("/");
  redirect("/");
}
