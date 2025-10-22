import { Link } from 'react-router-dom'
import { ArrowRight, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Hero section for the home page
 * Features prominent tagline and call-to-action buttons
 * Updated to match PDF design with orange/grey color scheme
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Top Orange Line */}
          <div className="w-full h-1 bg-orange-500 mb-8"></div>
          
          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-white font-brand mb-6">
            Creativity <span className="text-orange-500">Unlimited</span>
          </h1>
          
          {/* Elevator pitch */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl font-brand leading-relaxed">
            Rubexy Designs Limited delivers high-quality brand, print, and media solutions 
            for businesses in Zambia and beyond—from corporate wear and large-format signage 
            to photography and documentaries. Our clients trust our professional, efficient 
            service and long-term partnership mindset.
          </p>

          {/* Services */}
          <div className="mt-8 mb-12">
            <div className="flex items-center justify-center space-x-4 text-white">
              <span className="text-lg font-bold tracking-wider font-brand">PRINT</span>
              <div className="w-1 h-6 bg-orange-500"></div>
              <span className="text-lg font-bold tracking-wider font-brand">BRAND</span>
              <div className="w-1 h-6 bg-orange-500"></div>
              <span className="text-lg font-bold tracking-wider font-brand">MEDIA</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="gap-2 bg-orange-500 hover:bg-orange-600 text-white font-brand">
              <Link to="/rfq">
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 border-white text-white hover:bg-white hover:text-gray-900 font-brand">
              <Link to="/portfolio">
                <Eye className="h-4 w-4" />
                See Portfolio
              </Link>
            </Button>
          </div>

          {/* Service clusters */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-orange-200 bg-white/10 backdrop-blur p-6 text-left shadow-lg">
              <h3 className="text-lg font-semibold text-white font-brand">Brand & Print</h3>
              <p className="mt-2 text-sm text-gray-300 font-brand">
                Books, magazines, corporate wear, vehicle branding, billboards, signage, and more.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-orange-200 bg-white/10 backdrop-blur p-6 text-left shadow-lg">
              <h3 className="text-lg font-semibold text-white font-brand">Media</h3>
              <p className="mt-2 text-sm text-gray-300 font-brand">
                Professional photography, documentaries, and video advertising.
              </p>
            </div>
          </div>

          {/* Bottom Curved Elements */}
          <div className="relative mt-16">
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-white to-orange-500 transform -skew-y-1"></div>
            <div className="absolute bottom-0 left-0 w-full h-12 bg-orange-500 transform -skew-y-2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

