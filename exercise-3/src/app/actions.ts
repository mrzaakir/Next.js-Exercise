"use server";

export type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  success: boolean;
  message: string;
  error?: string;
};

export async function submitForm(
  _prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();

  console.log("Submitted email:", email);

  if (password.length < 6) {
    return {
      email,
      firstName,
      lastName,
      success: false,
      message: "",
      error: "Password must be at least 6 characters long.",
    };
  }

  const fullName = `${firstName} ${lastName}`.trim();

  return {
    email,
    firstName,
    lastName,
    success: true,
    message: fullName ? `Hello, ${fullName}!` : "Thanks for submitting!",
  };
}
