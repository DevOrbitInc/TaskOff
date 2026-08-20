import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext.jsx'
import Button from '../components/ui/Button'
import { Field, FieldLabel } from '../components/ui/Field'
import { Input } from '../components/ui/Input'

function Login() {
  const { login, loading, error } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLocalError('')

    if (!email || !password) {
      setLocalError('Please provide both email and password.')
      return
    }

    try {
      await login({ email, password })
      navigate('/board')
    } catch (err) {
      setLocalError(err.message)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex w-1/2 flex-col justify-center px-16 bg-ink text-white relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 500px 400px at 70% 20%, rgba(59,91,253,0.35), transparent 70%)',
        }}
      >
        <span className="mb-6 inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-signal">
          Welcome back
        </span>

        <h1 className="max-w-md text-4xl font-bold leading-tight">
          Every task, tracked from open to done.
        </h1>

        <p className="mt-4 max-w-sm text-sm text-white/60">
          Log back in to pick up right where your team left off.
        </p>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16 bg-paper">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-ink">Log in</h2>
          <p className="mt-1 text-sm text-muted">
            Welcome back to your workspace
          </p>

          <div className="mt-8 flex flex-col gap-5">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="you@taskoff.dev"
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
                placeholder="••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
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
            {loading ? 'Signing in...' : 'Log in'}
          </Button>

          <p className="mt-4 text-center text-sm text-muted">
            No account yet?{' '}
            <Link to="/register" className="font-semibold text-signal">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login