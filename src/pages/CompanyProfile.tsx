import { Building, Users, Award, Heart, Target, Eye, Shield, FileCheck } from 'lucide-react'
import { SEO } from '@/components/SEO'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LogoWall } from '@/components/LogoWall'
import { Testimonial } from '@/components/Testimonial'
import { EditText } from '@/components/EditText'
import { UploadImage } from '@/components/UploadImage'
import { useContentValue } from '@/hooks/useSiteContent'

/**
 * Company Profile page component
 * Matches the PDF design with orange/grey color scheme and Century Gothic typography
 */
export function CompanyProfile() {
  const logoSrc = useContentValue('site.logo', '/RDL Logo Full Color.png')
  const certifications = [
    {
      id: 'pacra',
      icon: Building,
      title: 'PACRA Certificate',
      subtitle: 'Company Registration',
      status: 'Active',
      valid: 'Registered 2013 • Incorporated 15 Dec 2021',
      description: 'Private Company Limited by Shares',
    },
    {
      id: 'zra',
      icon: FileCheck,
      title: 'ZRA Tax Clearance',
      subtitle: 'Tax Compliance',
      status: 'Valid',
      valid: 'Valid through 31 Dec 2025',
      description: 'Current tax clearance certificate in good standing',
    },
    {
      id: 'napsa',
      icon: Shield,
      title: 'NAPSA Compliance',
      subtitle: 'Social Security',
      status: 'Valid',
      valid: 'Valid through 18 Jun 2025',
      description: 'Employee contributions fully up to date',
    },
    {
      id: 'zppa',
      icon: Award,
      title: 'ZPPA Supplier Registration',
      subtitle: 'Procurement',
      status: 'Active',
      valid: 'Valid through 18 Mar 2026',
      description: 'Approved supplier for Printing, Media & ICT categories',
    },
  ]

  const testimonials = [
    {
      quote:
        'Rubexy Designs delivered exceptional quality on our fleet branding project. The attention to detail and professional service exceeded our expectations.',
      author: 'John Mwape',
      role: 'Operations Manager',
      company: 'Logistics Company',
    },
    {
      quote:
        'The team handled our annual report with utmost professionalism. From design to print, everything was flawless. We trust Rubexy for our corporate publishing needs.',
      author: 'Sarah Phiri',
      role: 'Marketing Director',
      company: 'Financial Services',
    },
    {
      quote:
        'Excellent photography and documentary production services. They captured our cancer awareness campaign beautifully and professionally.',
      author: 'Dr. Grace Banda',
      role: 'Executive Director',
      company: 'Breakthrough Cancer Trust',
    },
  ]

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
                <h1 className="text-white text-4xl md:text-5xl font-bold tracking-wider">
                  OUR COMPANY PROFILE
                </h1>
              </div>

              {/* Company Logo Area */}
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto overflow-hidden rounded-full border-4 border-gray-300 bg-white shadow-lg">
                  <img 
                    src={logoSrc} 
                    alt="RDL Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <UploadImage contentKey="site.logo" label="Logo" className="block mx-auto mt-4" />
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
        <section className="py-16 bg-white relative" id="mission">
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
                      <EditText
                        contentKey="companyprofile.mission.title"
                        fallback="Our Mission"
                        render={(value) => (
                          <h2 className="text-2xl font-bold text-gray-800 mb-4">{value}</h2>
                        )}
                      />
                      <EditText
                        contentKey="companyprofile.mission.content"
                        fallback="To maintain long-term business relations with our existing and prospective clients by providing quality products and services in a professional manner."
                        render={(value) => (
                          <p className="text-gray-700 leading-relaxed">{value}</p>
                        )}
                      />
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
                      <EditText
                        contentKey="companyprofile.vision.title"
                        fallback="Our Vision"
                        render={(value) => (
                          <h2 className="text-2xl font-bold text-gray-800 mb-4">{value}</h2>
                        )}
                      />
                      <EditText
                        contentKey="companyprofile.vision.content"
                        fallback="To create an enabling environment to our clients by providing solution-based products and services in an innovative, professional and efficient manner."
                        render={(value) => (
                          <p className="text-gray-700 leading-relaxed">{value}</p>
                        )}
                      />
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
        <section className="py-16 bg-gray-50" id="story">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <EditText
                  contentKey="companyprofile.about.title"
                  fallback="About Rubexy Designs Limited"
                  render={(value) => (
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{value}</h2>
                  )}
                />
                
                <div className="prose prose-lg max-w-none text-gray-700">
                  <EditText
                    contentKey="companyprofile.about.paragraph1"
                    fallback="Rubexy Designs Limited (RDL) was established in 2012 as a PACRA business name (registered 2013) and incorporated as a Private Company Limited by Shares on December 15, 2021. From our humble beginnings, we have grown into one of Zambia's trusted providers of comprehensive brand, print, and media solutions."
                    render={(value) => (
                      <p className="mb-6">{value}</p>
                    )}
                  />
                  
                  <EditText
                    contentKey="companyprofile.about.paragraph2"
                    fallback="Based in FINDECO House, Floor 12, Lusaka, we serve clients across Zambia and beyond. Our commitment to quality, professionalism, and efficiency has earned us the trust of leading organizations, government entities, and private businesses."
                    render={(value) => (
                      <p className="mb-6">{value}</p>
                    )}
                  />

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

                  <EditText
                    contentKey="companyprofile.about.paragraph3"
                    fallback="We are fully compliant with Zambian regulations, holding current certifications from PACRA, ZRA (Tax Clearance valid through December 2025), NAPSA (valid through June 2025), and ZPPA supplier registration (valid through March 2026)."
                    render={(value) => (
                      <p className="mb-6">{value}</p>
                    )}
                  />

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
        <section className="py-16 bg-white" id="csr">
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
        <section className="py-16 bg-gray-50" id="values">
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

        {/* Compliance & Certifications */}
        <section className="py-16 bg-white" id="compliance">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 font-brand">Compliance & Certifications</h2>
              <p className="text-gray-600 mt-2 font-brand">
                Fully registered and compliant with all Zambian regulatory requirements
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {certifications.map((cert) => {
                const Icon = cert.icon
                return (
                  <Card key={cert.id} className="border-2 border-orange-200 hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-brand">{cert.title}</CardTitle>
                          <p className="text-sm text-gray-500 font-brand">{cert.subtitle}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center justify-between text-sm font-brand">
                        <span className="text-gray-500">Status</span>
                        <span className="font-semibold text-green-600">{cert.status}</span>
                      </div>
                      <div className="text-sm text-gray-600 font-brand">{cert.valid}</div>
                      <p className="text-sm text-gray-600 font-brand">{cert.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-12 max-w-3xl mx-auto text-center">
              <p className="text-sm text-gray-500 font-brand">
                Copies of certificates can be provided to authorized parties upon request. We maintain privacy and security while remaining
                transparent with partners and clients.
              </p>
            </div>
          </div>
        </section>

        {/* Clients & Testimonials */}
        <section className="py-16 bg-gray-50" id="clients">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 font-brand">Clients & Partnerships</h2>
              <p className="text-gray-600 mt-2 font-brand">
                Trusted by leading organizations across Zambia and the region
              </p>
            </div>

            <LogoWall />

            <div className="mt-16 text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-800 font-brand mb-4">Project Highlights</h3>
              <p className="text-gray-600 font-brand">
                We have successfully delivered fleet branding for DHL Express and continue to support Breakthrough Cancer Trust with media
                services for cancer awareness initiatives.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-gray-800 font-brand text-center mb-8">What Our Clients Say</h3>
              <div className="grid gap-6 md:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <Testimonial key={index} {...testimonial} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

