"use server";

import { redirect } from "next/navigation";

export async function searchTodosAction(formData: FormData) {
  const search = String(formData.get("search") ?? "").trim();
  const status = String(formData.get("status") ?? "all");

  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (status && status !== "all") params.set("status", status);

  redirect(`/?${params.toString()}`);
}
