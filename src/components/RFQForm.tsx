import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { checkRateLimit } from '@/lib/utils'

/**
 * RFQ (Request for Quote) form validation schema
 * More detailed than contact form, includes quantity and file upload
 */
const rfqFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^(\+260|0)?[79]\d{8}$/, 'Please enter a valid Zambian phone number'),
  company: z.string().min(2, 'Company name is required'),
  service: z.string().min(1, 'Please select a service'),
  quantity: z.string().min(1, 'Quantity is required'),
  deadline: z.string().optional(),
  specifications: z.string().min(20, 'Please provide detailed specifications (minimum 20 characters)'),
  // Honeypot field
  website: z.string().optional(),
})

type RFQFormData = z.infer<typeof rfqFormSchema>

/**
 * Request for Quote form component
 * Includes file upload capability for artwork/specifications
 */
export function RFQForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<RFQFormData>({
    resolver: zodResolver(rfqFormSchema),
  })

  const serviceValue = watch('service')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please select a file smaller than 10MB',
        })
        return
      }
      setSelectedFile(file)
    }
  }

  const onSubmit = async (data: RFQFormData) => {
    // Honeypot check
    if (data.website) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Submission rejected. Please try again.',
      })
      return
    }

    // Rate limit check
    if (!checkRateLimit('rfq-form', 2, 15 * 60 * 1000)) {
      toast({
        variant: 'destructive',
        title: 'Too many requests',
        description: 'Please wait a few minutes before submitting again.',
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })
      
      if (selectedFile) {
        formData.append('file', selectedFile)
      }

      // Submit to API
      const response = await fetch('/api/rfq', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      toast({
        title: 'Quote request sent!',
        description: 'We\'ll review your requirements and get back to you within 24 hours.',
      })

      reset()
      setSelectedFile(null)
    } catch (error) {
      console.error('RFQ submission error:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit request. Please try again or contact us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="rfq-name">Name *</Label>
          <Input
            id="rfq-name"
            {...register('name')}
            placeholder="John Doe"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="rfq-email">Email *</Label>
          <Input
            id="rfq-email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="rfq-phone">Phone *</Label>
          <Input
            id="rfq-phone"
            type="tel"
            {...register('phone')}
            placeholder="+260 XXX XXXXXX"
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="rfq-company">Company *</Label>
          <Input
            id="rfq-company"
            {...register('company')}
            placeholder="Your Company"
            aria-invalid={errors.company ? 'true' : 'false'}
          />
          {errors.company && (
            <p className="text-sm text-destructive">{errors.company.message}</p>
          )}
        </div>

        {/* Service */}
        <div className="space-y-2">
          <Label htmlFor="rfq-service">Service *</Label>
          <Select
            value={serviceValue}
            onValueChange={(value) => setValue('service', value)}
          >
            <SelectTrigger id="rfq-service" aria-invalid={errors.service ? 'true' : 'false'}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="printing">Printing (Books, Magazines, etc.)</SelectItem>
              <SelectItem value="branding">Branding & Signage</SelectItem>
              <SelectItem value="corporate-wear">Corporate Wear</SelectItem>
              <SelectItem value="vehicle-branding">Vehicle Branding</SelectItem>
              <SelectItem value="large-format">Large Format (Billboards, Banners)</SelectItem>
              <SelectItem value="photography">Photography</SelectItem>
              <SelectItem value="videography">Videography & Documentaries</SelectItem>
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="text-sm text-destructive">{errors.service.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="rfq-quantity">Quantity *</Label>
          <Input
            id="rfq-quantity"
            {...register('quantity')}
            placeholder="e.g., 100 pieces"
            aria-invalid={errors.quantity ? 'true' : 'false'}
          />
          {errors.quantity && (
            <p className="text-sm text-destructive">{errors.quantity.message}</p>
          )}
        </div>

        {/* Deadline */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="rfq-deadline">Deadline (optional)</Label>
          <Input
            id="rfq-deadline"
            type="date"
            {...register('deadline')}
          />
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-2">
        <Label htmlFor="rfq-specifications">Project Specifications *</Label>
        <Textarea
          id="rfq-specifications"
          {...register('specifications')}
          placeholder="Please provide detailed specifications: dimensions, materials, colors, finishing, etc."
          rows={6}
          aria-invalid={errors.specifications ? 'true' : 'false'}
        />
        {errors.specifications && (
          <p className="text-sm text-destructive">{errors.specifications.message}</p>
        )}
      </div>

      {/* File upload */}
      <div className="space-y-2">
        <Label htmlFor="rfq-file">Upload Artwork/Specifications (optional, max 10MB)</Label>
        <div className="flex items-center gap-4">
          <Input
            id="rfq-file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.ai,.psd"
            className="flex-1"
          />
          {selectedFile && (
            <span className="text-sm text-muted-foreground">
              {selectedFile.name}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Accepted formats: PDF, DOC, DOCX, JPG, PNG, AI, PSD
        </p>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        {...register('website')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Submit Quote Request
          </>
        )}
      </Button>
    </form>
  )
}

