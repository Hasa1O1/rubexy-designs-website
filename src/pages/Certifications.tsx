import { useState } from 'react'
import { Building, FileCheck, Shield, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SEO } from '@/components/SEO'

/**
 * Certifications page component
 * Displays company compliance certifications with modal details
 */
export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<string | null>(null)

  const certifications = [
    {
      id: 'pacra',
      icon: Building,
      title: 'PACRA Certificate',
      type: 'Company Registration',
      status: 'Active',
      description: 'Private Company Limited by Shares',
      details: [
        'Business Name: Rubexy Designs Limited',
        'Registration Type: Private Company Limited by Shares',
        'Initial Registration: 2013 (Business Name)',
        'Incorporation Date: December 15, 2021',
        'Status: Active and in good standing',
      ],
    },
    {
      id: 'zra',
      icon: FileCheck,
      title: 'ZRA Tax Clearance Certificate',
      type: 'Tax Compliance',
      status: 'Valid',
      validUntil: 'December 31, 2025',
      description: 'Current tax clearance certificate',
      details: [
        'Issuing Authority: Zambia Revenue Authority (ZRA)',
        'Certificate Type: Tax Clearance Certificate',
        'Valid Through: December 31, 2025',
        'Status: Compliant',
        'Coverage: All applicable tax obligations',
      ],
    },
    {
      id: 'napsa',
      icon: Shield,
      title: 'NAPSA Compliance Certificate',
      type: 'Social Security',
      status: 'Valid',
      validUntil: 'June 18, 2025',
      description: 'National Pension Scheme Authority compliance',
      details: [
        'Issuing Authority: NAPSA',
        'Certificate Type: Compliance Certificate',
        'Valid Through: June 18, 2025',
        'Status: Fully Compliant',
        'Employee Contributions: Current and up-to-date',
      ],
    },
    {
      id: 'zppa',
      icon: Award,
      title: 'ZPPA Supplier Registration',
      type: 'Procurement',
      status: 'Valid',
      validUntil: 'March 18, 2026',
      description: 'Registered supplier for government procurement',
      details: [
        'Issuing Authority: Zambia Public Procurement Authority',
        'Registration Type: Supplier Registration',
        'Valid Through: March 18, 2026',
        'Status: Registered and Active',
        'Approved Categories:',
        '  • Printing Services',
        '  • Media Production',
        '  • ICT/Computer Services & Equipment',
        '  • Branding & Corporate Supplies',
      ],
    },
  ]

  const openModal = (certId: string) => {
    setSelectedCert(certId)
  }

  const closeModal = () => {
    setSelectedCert(null)
  }

  const selectedCertData = certifications.find(cert => cert.id === selectedCert)

  return (
    <>
      <SEO
        title="Certifications & Compliance | Rubexy Designs Limited"
        description="Rubexy Designs Limited is fully certified and compliant with Zambian regulations. View our PACRA, ZRA, NAPSA, and ZPPA certifications."
        keywords="pacra certified company, zra tax clearance, napsa compliant, zppa registered supplier zambia"
      />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Certifications & Compliance
              </h1>
              <p className="text-xl text-muted-foreground">
                Fully registered and compliant with all Zambian regulatory requirements
              </p>
            </div>
          </div>
        </section>

        {/* Certifications grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Rubexy Designs Limited maintains all required certifications and compliance 
                documentation. We are committed to operating with full transparency and in 
                accordance with Zambian laws and regulations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {certifications.map((cert) => {
                const Icon = cert.icon
                return (
                  <Card key={cert.id} className="cursor-pointer transition-all hover:shadow-lg">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-lg">{cert.title}</CardTitle>
                      <CardDescription>{cert.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="font-medium text-green-600">{cert.status}</span>
                        </div>
                        {cert.validUntil && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Valid Until:</span>
                            <span className="font-medium">{cert.validUntil}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => openModal(cert.id)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Additional info */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle>About Our Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Rubexy Designs Limited is committed to maintaining the highest standards of 
                    compliance and regulatory adherence. Our certifications demonstrate our 
                    commitment to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Legal business operations in Zambia</li>
                    <li>Timely tax compliance and payments</li>
                    <li>Employee welfare and social security contributions</li>
                    <li>Eligibility for government and private sector contracts</li>
                    <li>Professional and ethical business practices</li>
                  </ul>
                  <p className="text-muted-foreground">
                    <strong>Note:</strong> For verification purposes or to request copies of certificates 
                    (with sensitive information redacted), please contact us directly. We maintain 
                    privacy and security of all documentation while remaining transparent with 
                    authorized parties.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certificate detail modal */}
        <Dialog open={selectedCert !== null} onOpenChange={closeModal}>
          <DialogContent className="max-w-2xl">
            {selectedCertData && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    {(() => {
                      const Icon = selectedCertData.icon
                      return <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    })()}
                    {selectedCertData.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Certificate Details:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {selectedCertData.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Privacy Notice:</strong> Actual certificate images and sensitive 
                      registration numbers are not displayed publicly for security reasons. 
                      Authorized parties may request verification through official channels.
                    </p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}

