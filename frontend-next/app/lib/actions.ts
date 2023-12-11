import { signIn } from "next-auth/react";
import z from "zod";
import { signUp } from "@/app/lib/http/auth";

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const result = await signIn("credentials", { email, password, callbackUrl: '/files' });
    console.log({ result });
    if (result?.error) {
      return "Invalid email or password";
    } else {
      // redirect("/");
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

  try {
    const result = await signUp(
      parsedCredentials.data.email,
      parsedCredentials.data.password
    );

    console.log({ result });
  } catch (err) {
    console.log({ err });
    return "Error while signing up";
  }
};
