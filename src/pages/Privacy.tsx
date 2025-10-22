import { SEO } from '@/components/SEO'

/**
 * Privacy Policy page component
 * Details data handling and privacy practices
 */
export function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Rubexy Designs Limited"
        description="Read our privacy policy to understand how we handle your personal information and protect your data."
      />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl prose prose-lg">
              <h2>Introduction</h2>
              <p>
                Rubexy Designs Limited ("we," "our," or "us") is committed to protecting your 
                privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you visit our website or use our services.
              </p>

              <h2>Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul>
                <li>
                  <strong>Personal Information:</strong> Name, email address, phone number, company 
                  name, and other information you provide when contacting us or requesting a quote.
                </li>
                <li>
                  <strong>Project Information:</strong> Details about your project requirements, 
                  specifications, and uploaded files.
                </li>
                <li>
                  <strong>Technical Information:</strong> IP address, browser type, and basic usage 
                  data for site optimization (if analytics are enabled).
                </li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Respond to your inquiries and provide quotes</li>
                <li>Deliver our services and fulfill project requirements</li>
                <li>Communicate with you about your projects</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>Data Storage and Security</h2>
              <p>
                We do not store personal information on our servers except transiently for the 
                purpose of sending contact form emails. Uploaded files for quote requests are 
                processed and then deleted. We implement reasonable security measures to protect 
                your information from unauthorized access.
              </p>

              <h2>Data Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may 
                share information with:
              </p>
              <ul>
                <li>Service providers who assist in email delivery (transactional only)</li>
                <li>Legal authorities when required by law</li>
              </ul>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications (we don't send unsolicited marketing)</li>
              </ul>

              <h2>Cookies and Tracking</h2>
              <p>
                Our website uses minimal cookies for essential functionality. We do not use 
                third-party tracking cookies without your consent. Analytics, if enabled, are 
                privacy-focused and do not track individual users.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be 
                indicated by an updated "Last updated" date at the top of this page.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please 
                contact us:
              </p>
              <ul>
                <li>Email: rubexydesigns@gmail.com</li>
                <li>Phone: +260 972 188566</li>
                <li>Address: FINDECO House, Floor 12, Room 16/18, Lusaka, Zambia</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

