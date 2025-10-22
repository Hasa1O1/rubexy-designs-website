import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Main navigation header component
 * Features: Sticky navigation, mobile drawer menu, keyboard accessible
 * Updated to match PDF design with orange/grey color scheme
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/company-profile', label: 'Company Profile' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/clients', label: 'Clients' },
    { to: '/certifications', label: 'Certifications' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg border-b-2 border-orange-500">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Main navigation">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">RD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800 font-brand">Rubexy Designs</span>
            <span className="text-xs text-orange-600 font-medium">Creativity Unlimited</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-orange-600 font-brand',
                  isActive ? 'text-orange-600' : 'text-gray-700'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Button asChild size="sm" className="bg-orange-500 hover:bg-orange-600 text-white font-brand">
            <Link to="/rfq">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-700 hover:text-orange-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-16 z-50 border-b-2 border-orange-500 bg-white shadow-lg md:hidden">
            <div className="container px-4 py-4">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'rounded-md px-3 py-2 text-base font-medium transition-colors font-brand flex items-center gap-2',
                        isActive
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-700 hover:bg-orange-50'
                      )
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                    {link.label}
                  </NavLink>
                ))}
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white font-brand mt-4">
                  <Link to="/rfq" onClick={() => setMobileMenuOpen(false)}>
                    Get a Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

