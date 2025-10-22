import { useEffect } from 'react'

/**
 * Structured data (JSON-LD) component for SEO
 * Adds LocalBusiness and Organization schema markup
 */
export function StructuredData() {
  useEffect(() => {
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Rubexy Designs Limited',
      alternateName: 'RDL',
      url: 'https://rubexydesigns.com',
      logo: 'https://rubexydesigns.com/logo.svg',
      description: 'Rubexy Designs Limited delivers high-quality brand, print, and media solutions for businesses in Zambia and beyond.',
      email: 'rubexydesigns@gmail.com',
      telephone: ['+260972188566', '+260955530293'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'FINDECO House, Floor 12, Room 16/18',
        addressLocality: 'Lusaka',
        addressCountry: 'ZM',
      },
      foundingDate: '2012',
      slogan: 'Creativity Unlimited',
    }

    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://rubexydesigns.com',
      name: 'Rubexy Designs Limited',
      image: 'https://rubexydesigns.com/og-image.jpg',
      description: 'Professional brand, print, and media solutions provider in Zambia.',
      telephone: '+260972188566',
      email: 'rubexydesigns@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'FINDECO House, Floor 12, Room 16/18',
        addressLocality: 'Lusaka',
        addressCountry: 'ZM',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -15.4167,
        longitude: 28.2833,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      priceRange: '$$',
    }

    // Create script tags and add to head
    const script1 = document.createElement('script')
    script1.type = 'application/ld+json'
    script1.text = JSON.stringify(organizationSchema)
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.type = 'application/ld+json'
    script2.text = JSON.stringify(localBusinessSchema)
    document.head.appendChild(script2)

    // Cleanup function
    return () => {
      document.head.removeChild(script1)
      document.head.removeChild(script2)
    }
  }, [])

  return null
}

