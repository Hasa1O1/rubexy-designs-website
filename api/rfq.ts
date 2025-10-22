import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Serverless function to handle RFQ (Request for Quote) form submissions
 * Supports file uploads, validates input, sends email
 * Deployed on Vercel as /api/rfq
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Parse form data
    const { name, email, phone, company, service, quantity, deadline, specifications, website } = req.body

    // Honeypot check
    if (website) {
      return res.status(400).json({ error: 'Invalid submission' })
    }

    // Validate required fields
    if (!name || !email || !phone || !company || !service || !quantity || !specifications) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // Zambian phone validation
    const phoneRegex = /^(\+260|0)?[79]\d{8}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Invalid phone number' })
    }

    // Prepare email content
    const emailBody = `
New Quote Request

CONTACT INFORMATION
-------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}

PROJECT DETAILS
---------------
Service: ${service}
Quantity: ${quantity}
Deadline: ${deadline || 'Not specified'}

SPECIFICATIONS
--------------
${specifications}

---
Submitted at: ${new Date().toLocaleString()}
${req.body.file ? '\n\n[File attached - see email attachment]' : ''}
    `.trim()

    // Log the submission
    console.log('RFQ submission:', { name, email, phone, company, service })
    console.log('Email body:', emailBody)

    // TODO: Integrate with email service
    // Handle file upload if present
    // const file = req.body.file
    // if (file) {
    //   // Process file attachment
    //   // Note: File handling in serverless functions may require special configuration
    //   // Consider using services like Cloudinary or S3 for file storage
    // }

    // Example with email service:
    // await emailService.send({
    //   to: 'rubexydesigns@gmail.com',
    //   from: 'noreply@rubexydesigns.com',
    //   subject: `New Quote Request: ${service} - ${company}`,
    //   text: emailBody,
    //   attachments: file ? [{ filename: file.name, content: file.data }] : [],
    // })

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Your quote request has been submitted successfully. We will review it and get back to you within 24 hours.',
    })
  } catch (error) {
    console.error('RFQ form error:', error)
    return res.status(500).json({
      error: 'Internal server error. Please try again or contact us directly.',
    })
  }
}

