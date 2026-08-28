import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import Button from "../components/ui/Button";
import { Field, FieldLabel } from "../components/ui/Field";
import { Input } from "../components/ui/Input";

function Register() {
  const { register, loading, error } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    if (!fullName || !email || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    try {
      await register({ fullName, email, password });
      navigate("/dashboard");
    } catch (err) {
      setLocalError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex w-1/2 flex-col justify-center px-16 bg-ink text-white relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 500px 400px at 70% 20%, rgba(59,91,253,0.35), transparent 70%)",
        }}
      >
        <span className="mb-6 inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-signal">
          First time here
        </span>

        <h1 className="max-w-md text-4xl font-bold leading-tight">
          Built by a team learning to ship together.
        </h1>

        <p className="mt-4 max-w-sm text-sm text-white/60">
          Your first board is one signup away.
        </p>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-paper">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-ink">Create your account</h2>
          <p className="mt-1 text-sm text-muted">Takes less than a minute</p>

          <div className="mt-8 flex flex-col gap-5">
            <Field>
              <FieldLabel htmlFor="fullName">Full name</FieldLabel>
              <Input
                id="fullName"
                type="text"
                placeholder="your full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete="name"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
              />
            </Field>
          </div>

          {(localError || error) && (
            <div className="mt-4 text-sm text-danger">
              {localError || error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="mt-6 w-full"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>

          <p className="mt-4 text-center text-sm text-muted">
            Already have one?{" "}
            <Link to="/login" className="font-semibold text-signal">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
