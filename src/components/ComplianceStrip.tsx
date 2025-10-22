import { Shield, FileCheck, Building, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Compliance badges strip showing company certifications and registrations
 * Displays PACRA, ZRA, NAPSA, and ZPPA compliance
 * Updated to match PDF design with orange/grey color scheme
 */
export function ComplianceStrip() {
  const badges = [
    {
      icon: Building,
      label: 'PACRA Certified',
      description: 'Private Company Limited by Shares',
    },
    {
      icon: FileCheck,
      label: 'ZRA Tax Clearance',
      description: 'Valid through Dec 2025',
    },
    {
      icon: Shield,
      label: 'NAPSA Compliant',
      description: 'Valid through Jun 2025',
    },
    {
      icon: Award,
      label: 'ZPPA Registered',
      description: 'Supplier Registration Valid',
    },
  ]

  return (
    <section className="py-8 bg-gradient-to-r from-gray-100 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 font-brand">Certified & Compliant</h2>
          <p className="text-gray-600 mt-2 font-brand">
            Fully registered and compliant with Zambian regulations
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <Link
                key={index}
                to="/certifications"
                className="flex flex-col items-center gap-3 rounded-lg border-2 border-orange-200 bg-white p-4 text-center transition-all hover:shadow-lg hover:border-orange-400 focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800 font-brand">{badge.label}</div>
                  <div className="text-xs text-gray-600 mt-1 font-brand">{badge.description}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

