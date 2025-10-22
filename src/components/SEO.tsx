import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: string
  canonical?: string
}

/**
 * SEO component to manage meta tags for each page
 * Updates document title and meta tags based on props
 */
export function SEO({
  title = 'Rubexy Designs Limited | Creativity Unlimited',
  description = 'Rubexy Designs Limited delivers high-quality brand, print, and media solutions for businesses in Zambia and beyond.',
  keywords = 'printing, branding, corporate wear, vehicle branding, photography, documentaries, zambia, lusaka, design',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  canonical,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Standard meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)

    // OpenGraph tags
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:type', ogType, true)
    updateMetaTag('og:image', ogImage, true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', ogImage)

    // Canonical URL
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      
      if (!linkElement) {
        linkElement = document.createElement('link')
        linkElement.setAttribute('rel', 'canonical')
        document.head.appendChild(linkElement)
      }
      
      linkElement.setAttribute('href', canonical)
    }
  }, [title, description, keywords, ogImage, ogType, canonical])

  return null
}

