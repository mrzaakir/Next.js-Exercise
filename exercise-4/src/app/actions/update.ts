"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchTodoById, updateTodo } from "../lib/todo";

export async function updateTodoAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const priority = String(formData.get("priority") ?? "medium");

  if (!id) {
    console.error("Todo ID is required");
    return;
  }

  if (!title || title.length === 0) {
    console.error("Title is required");
    return;
  }

  if (title.length > 200) {
    console.error("Title must be less than 200 characters");
    return;
  }

  const validPriority = priority === "low" || priority === "medium" || priority === "high" ? priority : "medium";

  const existingTodo = await fetchTodoById(id);
  if (!existingTodo) {
    console.error("Todo not found");
    return;
  }

  const success = await updateTodo(id, { title, priority: validPriority });

  if (!success) {
    console.error("Failed to update todo");
    return;
  }

  revalidatePath("/");
  redirect("/");
}
