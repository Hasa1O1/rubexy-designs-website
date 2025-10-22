import { Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface TestimonialProps {
  quote: string
  author: string
  role: string
  company: string
}

/**
 * Testimonial card component
 * Displays client testimonials with quote, author info
 */
export function Testimonial({ quote, author, role, company }: TestimonialProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-primary/20 mb-4" aria-hidden="true" />
        <blockquote className="text-muted-foreground mb-6">
          "{quote}"
        </blockquote>
        <div className="border-t pt-4">
          <div className="font-semibold">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
          <div className="text-sm text-muted-foreground">{company}</div>
        </div>
      </CardContent>
    </Card>
  )
}

