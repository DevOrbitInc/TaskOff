import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext.jsx'

function Register() {
  const { register, loading, error } = useContext(AuthContext)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLocalError('')

    if (!fullName || !email || !password) {
      setLocalError('Please fill in all fields.')
      return
    }

    try {
      await register({ fullName, email, password })
      navigate('/dashboard')
    } catch (err) {
      setLocalError(err.message)
    }
  }

  return (
    <div className="auth-page">
      <h1>Register</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            autoComplete="name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
        {(localError || error) && <div className="auth-error">{localError || error}</div>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register
