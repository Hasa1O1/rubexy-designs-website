import { Navigate } from 'react-router-dom'

/**
 * Clients page now redirects to the consolidated Company Profile page
 */
export function Clients() {
  return <Navigate to="/company-profile#clients" replace />
}

