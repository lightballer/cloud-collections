import { register } from "@/app/lib/actions";
import clsx from "clsx";
import { useFormState } from "react-dom";

const RegisterForm = () => {
  const [errorMessage, dispatch] = useFormState(register, undefined);

  return (
    <form action={dispatch}>
      <div className="m-4">
        <label htmlFor="email" className="inline-block py-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="peer block w-full rounded-md px-2 py-1 border-2 border-slate-400 p-2  caret-slate-600 outline-none ring-slate-300 invalid:border-red-500 focus:border-slate-500 focus:ring-4"
          id="email"
        />
        <p className="invisible text-red-600 peer-invalid:visible peer-focus:invisible">
          Must be a valid email address.
        </p>
      </div>
      <div className="m-4">
        <label htmlFor="password" className="inline-block py-2">
          Password
        </label>

        <input
          type="password"
          name="password"
          className="block rounded-md px-2 py-1 w-60"
          id="password"
          required
        />
      </div>
      <div className="m-4">
        <label htmlFor="password" className="inline-block py-2">
          Repeat password
        </label>
        <input
          type="password"
          name="password_repeated"
          className="block rounded-md px-2 py-1 w-60"
          id="repeated-password"
          required
        />
        <p
          className={clsx("text-red-600", {
            invisible: !errorMessage,
          })}
        >
          {errorMessage}
        </p>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="rounded-xl border-white border-2 px-4 py-2"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
