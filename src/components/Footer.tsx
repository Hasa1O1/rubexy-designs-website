import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from 'lucide-react'

/**
 * Site footer with contact information, quick links, and social media
 * Updated to match PDF design with orange/grey color scheme
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-orange-500 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-brand">Rubexy Designs Limited</h3>
            <p className="text-sm text-orange-100">
              Creativity Unlimited. Providing quality brand, print, and media solutions since 2012.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-brand">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/company-profile" className="text-orange-100 hover:text-white transition-colors font-brand">
                  Company Profile
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-orange-100 hover:text-white transition-colors font-brand">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-orange-100 hover:text-white transition-colors font-brand">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-orange-100 hover:text-white transition-colors font-brand">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="text-orange-100 hover:text-white transition-colors font-brand">
                  Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-brand">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-orange-200" aria-hidden="true" />
                <span className="text-orange-100">
                  FINDECO House, Floor 12, Room 16/18<br />
                  Lusaka, Zambia
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-orange-200" aria-hidden="true" />
                <a href="tel:+260972188566" className="text-orange-100 hover:text-white transition-colors font-brand">
                  +260 972 188566
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-orange-200" aria-hidden="true" />
                <a href="tel:+260955530293" className="text-orange-100 hover:text-white transition-colors font-brand">
                  +260 955 530293
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-orange-200" aria-hidden="true" />
                <a href="mailto:rubexydesigns@gmail.com" className="text-orange-100 hover:text-white transition-colors font-brand">
                  rubexydesigns@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-brand">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-100 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-100 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-100 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-orange-400 pt-8 text-center text-sm text-orange-100">
          <p className="font-brand">© {currentYear} Rubexy Designs Limited. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-white transition-colors font-brand">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}