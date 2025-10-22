import { Building, Users, Award, Heart, Target, Eye } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Company Profile page component
 * Matches the PDF design with orange/grey color scheme and Century Gothic typography
 */
export function CompanyProfile() {
  return (
    <>
      <SEO
        title="Company Profile | Rubexy Designs Limited"
        description="Official company profile of Rubexy Designs Limited - established 2012, incorporated 2021. Providing quality brand, print, and media solutions with creativity unlimited."
        keywords="rubexy designs company profile, zambian design company, printing services lusaka, corporate profile"
      />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section - Matching PDF Cover */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              {/* Top Orange Line */}
              <div className="w-full h-1 bg-orange-500 mb-8"></div>
              
              {/* Main Title */}
              <div className="mb-8">
                <span className="text-white text-lg font-light tracking-wider">Our</span>
                <div className="inline-block border-2 border-white px-6 py-2 mx-4">
                  <h1 className="text-white text-3xl md:text-4xl font-bold tracking-wider">
                    COMPANY PROFILE
                  </h1>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center border-4 border-white">
                    <span className="text-white text-2xl font-bold">25</span>
                  </div>
                  <span className="text-white text-sm font-light ml-2 tracking-wider">TWENTY</span>
                </div>
              </div>

              {/* Company Logo Area */}
              <div className="mb-8">
                <div className="w-32 h-32 bg-white rounded-full mx-auto flex items-center justify-center border-4 border-gray-300 shadow-lg">
                  <div className="text-center">
                    <div className="text-gray-800 text-xl font-bold">Rubexy</div>
                    <div className="text-gray-600 text-sm font-medium">DESIGNS LTD</div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 text-white">
                  <span className="text-lg font-bold tracking-wider">PRINT</span>
                  <div className="w-1 h-6 bg-orange-500"></div>
                  <span className="text-lg font-bold tracking-wider">BRAND</span>
                  <div className="w-1 h-6 bg-orange-500"></div>
                  <span className="text-lg font-bold tracking-wider">MEDIA</span>
                </div>
                <div className="mt-4">
                  <span className="text-white text-xl italic font-light">Creativity Unlimited</span>
                </div>
              </div>

              {/* Bottom Curved Elements */}
              <div className="relative">
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-white to-orange-500 transform -skew-y-1"></div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-orange-500 transform -skew-y-2"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 max-w-6xl mx-auto">
              {/* Mission */}
              <div className="relative">
                <div className="bg-gray-100 rounded-2xl p-8 border-l-4 border-orange-500">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500 text-white p-3 rounded-lg">
                      <Target className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                      <p className="text-gray-700 leading-relaxed">
                        To maintain long-term business relations with our existing and prospective clients 
                        by providing quality products and services in a professional manner.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-4 py-2 rounded-lg rotate-90 text-sm font-bold">
                  MISSION
                </div>
              </div>

              {/* Vision */}
              <div className="relative">
                <div className="bg-orange-50 rounded-2xl p-8 border-l-4 border-orange-500">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500 text-white p-3 rounded-lg">
                      <Eye className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
                      <p className="text-gray-700 leading-relaxed">
                        To create an enabling environment to our clients by providing solution-based 
                        products and services in an innovative, professional and efficient manner.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-4 py-2 rounded-lg rotate-90 text-sm font-bold">
                  VISION
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Information Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">About Rubexy Designs Limited</h2>
                
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="mb-6">
                    <strong>Rubexy Designs Limited (RDL)</strong> was established in 2012 as a PACRA business name 
                    (registered 2013) and incorporated as a Private Company Limited by Shares on{' '}
                    <strong>December 15, 2021</strong>. From our humble beginnings, we have grown into 
                    one of Zambia's trusted providers of comprehensive brand, print, and media solutions.
                  </p>
                  
                  <p className="mb-6">
                    Based in <strong>FINDECO House, Floor 12, Lusaka</strong>, we serve clients across 
                    Zambia and beyond. Our commitment to quality, professionalism, and efficiency has 
                    earned us the trust of leading organizations, government entities, and private businesses.
                  </p>

                  <div className="bg-orange-50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Our Services</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-orange-600 mb-2">Brand & Print</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Books, magazines, posters, flyers</li>
                          <li>• Certificates, business cards, letterheads</li>
                          <li>• Corporate wear supply & branding</li>
                          <li>• Vehicle branding & signage</li>
                          <li>• Billboards, light boxes, pop-up banners</li>
                          <li>• Office branding & embroidery</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-600 mb-2">Media</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Professional photography</li>
                          <li>• Documentary production</li>
                          <li>• Video advertisements</li>
                          <li>• Corporate videography</li>
                          <li>• Event coverage</li>
                          <li>• Product photography</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <p className="mb-6">
                    We are fully compliant with Zambian regulations, holding current certifications from 
                    PACRA, ZRA (Tax Clearance valid through December 2025), NAPSA (valid through June 2025), 
                    and ZPPA supplier registration (valid through March 2026).
                  </p>

                  <div className="text-center">
                    <p className="text-orange-600 font-bold text-lg">
                      We look forward to doing business with you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CSR Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-white">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="h-8 w-8 text-orange-500" />
                    <CardTitle className="text-2xl text-gray-800">Corporate Social Responsibility</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    At Rubexy Designs, we believe in giving back to the community. We are proud to
                    serve as a <strong>media partner for Breakthrough Cancer Trust</strong>, providing
                    media services for cancer-awareness initiatives.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Through our partnership, we use our expertise in photography, videography, and
                    multimedia production to help raise awareness about cancer prevention, early
                    detection, and support for those affected. This is our way of using creativity
                    for a meaningful cause.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Rubexy Designs Limited?</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Friendly Support Staff</h3>
                  <p className="text-gray-600">Our team is approachable and always ready to help with your project needs.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Highly Efficient</h3>
                  <p className="text-gray-600">We deliver projects on time and within budget, every time.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Client Oriented</h3>
                  <p className="text-gray-600">Your success is our priority. We tailor solutions to your specific needs.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Very Professional</h3>
                  <p className="text-gray-600">We maintain the highest standards of professionalism in all our work.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Great & Impeccable</h3>
                  <p className="text-gray-600">We strive for perfection in every project we undertake.</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Creativity Unlimited</h3>
                  <p className="text-gray-600">Our motto drives us to push creative boundaries and deliver innovative solutions.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

