import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

/**
 * Component tests for Button
 * Run with: npm test
 */

describe('Button component', () => {
  it('should render with default variant', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeDefined()
  })

  it('should apply variant classes', () => {
    const { container } = render(<Button variant="outline">Outline</Button>)
    const button = container.querySelector('button')
    expect(button?.className).toContain('border')
  })

  it('should handle disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button.hasAttribute('disabled')).toBe(true)
  })

  it('should apply size variants', () => {
    const { container } = render(<Button size="sm">Small</Button>)
    const button = container.querySelector('button')
    expect(button?.className).toContain('h-9')
  })
})

