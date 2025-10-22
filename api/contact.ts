import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Serverless function to handle contact form submissions
 * Validates input, sends email, and returns JSON response
 * Deployed on Vercel as /api/contact
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, phone, company, service, message, website } = req.body

    // Honeypot check - if website field is filled, it's likely spam
    if (website) {
      return res.status(400).json({ error: 'Invalid submission' })
    }

    // Validate required fields
    if (!name || !email || !phone || !service || !message) {
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
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company || 'Not provided'}
Service Interest: ${service}

Message:
${message}

---
Submitted at: ${new Date().toLocaleString()}
    `.trim()

    // In production, integrate with an email service like SendGrid, Mailgun, or Resend
    // For now, we'll log the submission
    console.log('Contact form submission:', { name, email, phone, service })
    console.log('Email body:', emailBody)

    // TODO: Integrate with email service
    // Example with SendGrid:
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // await sgMail.send({
    //   to: 'rubexydesigns@gmail.com',
    //   from: 'noreply@rubexydesigns.com',
    //   subject: `New Contact: ${name}`,
    //   text: emailBody,
    // })

    // For demo purposes, simulate email sending
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({
      error: 'Internal server error. Please try again or contact us directly.',
    })
  }
}

