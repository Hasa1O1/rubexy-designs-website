/**
 * Logo wall component to display client logos
 * Shows a grid of client/partner logos
 */
export function LogoWall() {
  // Placeholder logos - in production, these would be actual client logos
  const logos = [
    { name: 'DHL', description: 'Logistics & Delivery' },
    { name: 'Breakthrough Cancer Trust', description: 'Healthcare NGO' },
    { name: 'Client 3', description: 'Industry Partner' },
    { name: 'Client 4', description: 'Corporate Partner' },
    { name: 'Client 5', description: 'Government Entity' },
    { name: 'Client 6', description: 'Private Sector' },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Trusted by Leading Organizations</h2>
          <p className="text-muted-foreground mt-2">
            We've had the privilege to work with amazing clients
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 transition-all hover:shadow-md"
            >
              <div className="flex h-16 items-center justify-center">
                <span className="text-lg font-semibold text-muted-foreground">
                  {logo.name}
                </span>
              </div>
              <span className="mt-2 text-xs text-muted-foreground text-center">
                {logo.description}
              </span>
            </div>
          ))}
        </div>

        {/* Notable mention */}
        <div className="mt-12 rounded-2xl border bg-primary/5 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Notable:</strong> We have successfully delivered services to DHL and continue
            to support Breakthrough Cancer Trust with media services for cancer awareness initiatives.
          </p>
        </div>
      </div>
    </section>
  )
}

