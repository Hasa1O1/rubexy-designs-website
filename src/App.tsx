import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'
import { StructuredData } from '@/components/StructuredData'

// Pages
import { Home } from '@/pages/Home'
import { CompanyProfile } from '@/pages/CompanyProfile'
import { About } from '@/pages/About'
import { Services } from '@/pages/Services'
import { Portfolio } from '@/pages/Portfolio'
import { Clients } from '@/pages/Clients'
import { Certifications } from '@/pages/Certifications'
import { Contact } from '@/pages/Contact'
import { RFQ } from '@/pages/RFQ'
import { Privacy } from '@/pages/Privacy'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * Main App component
 * Sets up routing, global providers, and layout
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex min-h-screen flex-col">
          {/* Structured data for SEO */}
          <StructuredData />
          
          {/* Header */}
          <Header />
          
          {/* Main content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company-profile" element={<CompanyProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/rfq" element={<RFQ />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </div>
          
          {/* Footer */}
          <Footer />
          
          {/* Toast notifications */}
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App

