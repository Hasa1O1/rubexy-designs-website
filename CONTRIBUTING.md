# Contributing Guidelines

Thank you for your interest in contributing to the Rubexy Designs website!

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/rubexy-website.git
   cd rubexy-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Code Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Add JSDoc comments for complex components
- Use proper prop types

Example:
```typescript
interface MyComponentProps {
  title: string
  onClick?: () => void
}

/**
 * Description of what this component does
 */
export function MyComponent({ title, onClick }: MyComponentProps) {
  // Component logic
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing (use Tailwind's spacing scale)
- Use CSS custom properties for theme colors

### Accessibility

- All interactive elements must be keyboard accessible
- Include proper ARIA labels
- Maintain color contrast ratios ≥ 4.5:1
- Test with screen readers before submitting

## Commit Messages

Follow the conventional commits specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(contact): add phone validation for Zambian numbers
fix(header): resolve mobile menu closing issue
docs(readme): update deployment instructions
```

## Pull Request Process

1. **Update your branch**
   ```bash
   git pull origin main
   ```

2. **Run quality checks**
   ```bash
   npm run typecheck
   npm run lint
   npm run test
   npm run build
   ```

3. **Create pull request**
   - Provide clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

4. **Code review**
   - Address review feedback promptly
   - Keep discussion professional and constructive

## Testing Requirements

- Add tests for new utilities and functions
- Test components with user interactions
- Verify accessibility with automated tools
- Manual testing on Chrome, Firefox, Safari

## File Organization

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   └── *.tsx            # Custom components
├── pages/               # Route components
├── lib/                 # Utilities
└── tests/              # Test files
```

## Questions or Issues?

- Email: rubexydesigns@gmail.com
- Create an issue on GitHub

Thank you for contributing! 🎉

