"use client";

import { useActionState } from "react";
import { submitForm, type FormState } from "@/app/actions";

const initialState: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  success: false,
  message: "",
};

export default function FormDemo() {
  const [state, formAction] = useActionState(submitForm, initialState);

  return (
    <form action={formAction} style={{ display: "grid", gap: "1rem" }}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={state.email}
          style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
        />
      </div>

      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          defaultValue={state.firstName}
          style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          defaultValue={state.lastName}
          style={{ display: "block", width: "100%", marginTop: "0.5rem" }}
        />
      </div>

      <button type="submit">Submit</button>

      {state.error ? <p style={{ color: "#dc2626", fontWeight: 600 }}>{state.error}</p> : null}
      {state.success ? <p style={{ color: "#15803d", fontWeight: 700 }}>{state.message}</p> : null}
      {!state.success && state.message ? <p>{state.message}</p> : null}
    </form>
  );
}
