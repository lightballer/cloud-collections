// 'use client';

import { authenticate } from "@/app/lib/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <div className="m-4">
        <label htmlFor="email" className="inline-block py-2">
          Email
        </label>
        <div>
          <input
            type="email"
            name="email"
            className="rounded-md px-2 py-1 w-60"
            id="email"
            required
          />
        </div>
      </div>
      <div className="m-4">
        <label htmlFor="password" className="inline-block py-2">
          Password
        </label>
        <div>
          <input
            type="password"
            name="password"
            className="rounded-md px-2 py-1 w-60"
            id="password"
            required
          />
        </div>
        {errorMessage && (
          <div className="text-danger">{errorMessage}</div>
        )}
      </div>
      <div className="flex justify-center">
        <button type="submit" className="rounded-xl border-white border-2 px-4 py-2">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
