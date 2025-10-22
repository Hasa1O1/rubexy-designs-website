import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS classes with proper precedence handling
 * Uses clsx for conditional classes and tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a phone number to Zambian format
 */
export function formatPhoneZambia(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  // Format as +260 XXX XXXXXX
  if (digits.startsWith('260')) {
    return `+260 ${digits.slice(3, 6)} ${digits.slice(6)}`
  }
  
  return phone
}

/**
 * Simple rate limiting check using session storage
 * Returns true if action is allowed, false if rate limited
 */
export function checkRateLimit(key: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now()
  const stored = sessionStorage.getItem(`ratelimit_${key}`)
  
  if (!stored) {
    sessionStorage.setItem(`ratelimit_${key}`, JSON.stringify({ count: 1, start: now }))
    return true
  }
  
  const { count, start } = JSON.parse(stored)
  
  // Reset if window expired
  if (now - start > windowMs) {
    sessionStorage.setItem(`ratelimit_${key}`, JSON.stringify({ count: 1, start: now }))
    return true
  }
  
  // Check if under limit
  if (count < maxAttempts) {
    sessionStorage.setItem(`ratelimit_${key}`, JSON.stringify({ count: count + 1, start }))
    return true
  }
  
  return false
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

