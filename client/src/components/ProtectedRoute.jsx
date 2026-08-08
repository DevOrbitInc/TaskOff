import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext.jsx'
import AppShell from './AppShell.jsx'

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) {
    return <div>Loading authentication...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <AppShell>{children}</AppShell>
}

export default ProtectedRoute
