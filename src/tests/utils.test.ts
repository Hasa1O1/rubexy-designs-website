import { describe, it, expect } from 'vitest'
import { cn, formatPhoneZambia, sanitizeInput } from '@/lib/utils'

/**
 * Unit tests for utility functions
 * Run with: npm test
 */

describe('cn (className utility)', () => {
  it('should merge class names', () => {
    expect(cn('px-2', 'py-1')).toBe('px-2 py-1')
  })

  it('should handle conditional classes', () => {
    expect(cn('base', true && 'conditional')).toBe('base conditional')
    expect(cn('base', false && 'conditional')).toBe('base')
  })

  it('should handle Tailwind conflicts', () => {
    // tailwind-merge should keep the last px value
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})

describe('formatPhoneZambia', () => {
  it('should format Zambian phone numbers correctly', () => {
    expect(formatPhoneZambia('260972188566')).toBe('+260 972 188566')
    expect(formatPhoneZambia('260955530293')).toBe('+260 955 530293')
  })

  it('should handle numbers already with country code', () => {
    expect(formatPhoneZambia('260971234567')).toBe('+260 971 234567')
  })

  it('should return original if not valid format', () => {
    expect(formatPhoneZambia('123456')).toBe('123456')
  })
})

describe('sanitizeInput', () => {
  it('should escape HTML special characters', () => {
    expect(sanitizeInput('<script>alert("xss")</script>'))
      .toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;')
  })

  it('should escape quotes', () => {
    expect(sanitizeInput('Test "quotes" and \'apostrophes\''))
      .toBe('Test &quot;quotes&quot; and &#x27;apostrophes&#x27;')
  })

  it('should handle normal text', () => {
    expect(sanitizeInput('Normal text 123')).toBe('Normal text 123')
  })

  it('should escape all dangerous characters', () => {
    const dangerous = '<>"\'/'
    const safe = '&lt;&gt;&quot;&#x27;&#x2F;'
    expect(sanitizeInput(dangerous)).toBe(safe)
  })
})

