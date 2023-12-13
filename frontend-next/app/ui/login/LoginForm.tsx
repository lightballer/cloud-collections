import { authenticate } from "@/app/lib/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <div className="row mb-3">
        <label htmlFor="email" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            required
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="password" className="col-sm-2 col-form-label">
          Password
        </label>
        <div className="col-sm-10">
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            required
          />
        </div>
        {errorMessage && (
          <div className="help-block text-danger">{errorMessage}</div>
        )}
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary btn-sm">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
