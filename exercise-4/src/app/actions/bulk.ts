"use server";

import { revalidatePath } from "next/cache";
import { bulkDeleteTodos, bulkUpdateStatus } from "../lib/todo";

export async function bulkDeleteAction(formData: FormData) {
  const ids = String(formData.get("ids") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  await bulkDeleteTodos(ids);
  revalidatePath("/");
}

export async function bulkToggleAction(formData: FormData) {
  const ids = String(formData.get("ids") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  const completed = String(formData.get("completed") ?? "false") === "true";

  await bulkUpdateStatus(ids, completed);
  revalidatePath("/");
}
