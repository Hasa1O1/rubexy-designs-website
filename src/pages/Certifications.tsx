import { Navigate } from 'react-router-dom'

/**
 * Certifications page now redirects to the consolidated Company Profile page
 */
export function Certifications() {
  return <Navigate to="/company-profile#compliance" replace />
}

