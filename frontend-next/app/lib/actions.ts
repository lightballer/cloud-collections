import { signIn } from "next-auth/react";
import z from "zod";
import { signUp } from "@/app/lib/http/auth";
import { redirect } from "next/navigation";

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/files",
    });
    console.log({ result });
    if (result?.error) {
      return "Invalid email or password";
    }
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return "Something went wrong.";
    }
    throw error;
  }
};

export const register = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const repeatedPassword = formData.get("password_repeated");

  if (password !== repeatedPassword) {
    return "Passwords should match";
  }
  const parsedCredentials = z
    .object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse({ email, password });
  if (!parsedCredentials.success) return "Invalid credentials";

  let ok = false;

  try {
    const result = await signUp(
      parsedCredentials.data.email,
      parsedCredentials.data.password
    );
    console.log({ result });
    if (!result) return "Error while signing up";
    ok = true;
  } catch (err) {
    console.log({ err });
    return "Error while signing up";
  } finally {
    if (ok) redirect("/login");
  }
};
