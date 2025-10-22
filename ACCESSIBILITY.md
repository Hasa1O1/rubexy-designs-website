# Accessibility Checklist

This document outlines the accessibility features implemented in the Rubexy Designs website and provides a testing checklist.

## WCAG 2.2 AA Compliance

### ✅ Perceivable

- [ ] **Text Alternatives**: All images have appropriate alt text
- [ ] **Captions**: Any video content includes captions
- [ ] **Color Contrast**: All text meets 4.5:1 contrast ratio (3:1 for large text)
- [ ] **Resize Text**: Content remains readable when text is resized to 200%
- [ ] **Reflow**: Content reflows without horizontal scrolling at 320px width

### ✅ Operable

- [ ] **Keyboard Navigation**: All interactive elements are keyboard accessible
- [ ] **No Keyboard Trap**: Users can navigate away from all elements using keyboard
- [ ] **Focus Visible**: Focus indicators are clearly visible (2px outline)
- [ ] **Skip Links**: "Skip to main content" link available (optional enhancement)
- [ ] **Page Titles**: Each page has a unique, descriptive title
- [ ] **Focus Order**: Tab order follows a logical sequence
- [ ] **Link Purpose**: Link text clearly describes destination

### ✅ Understandable

- [ ] **Language**: Page language is declared (lang="en")
- [ ] **Predictable Navigation**: Navigation is consistent across pages
- [ ] **Labels**: Form inputs have associated labels
- [ ] **Error Identification**: Form errors are clearly identified
- [ ] **Error Suggestions**: Form errors include suggestions for correction
- [ ] **Error Prevention**: Confirmation required for important actions

### ✅ Robust

- [ ] **Valid HTML**: No parsing errors
- [ ] **ARIA**: Proper use of ARIA roles and properties
- [ ] **Name, Role, Value**: All UI components have accessible names

## Testing Procedures

### Automated Testing

1. **Lighthouse**
   - Open Chrome DevTools → Lighthouse
   - Run accessibility audit
   - Target: Score ≥ 90

2. **axe DevTools**
   - Install [axe DevTools extension](https://www.deque.com/axe/devtools/)
   - Run full page scan
   - Fix all violations and warnings

3. **WAVE**
   - Use [WAVE browser extension](https://wave.webaim.org/extension/)
   - Check for errors and alerts

### Manual Testing

1. **Keyboard Navigation**
   ```
   - Tab through all interactive elements
   - Ensure focus is visible
   - Test Enter/Space on buttons and links
   - Test Escape to close modals/dialogs
   - Verify mobile menu keyboard accessibility
   ```

2. **Screen Reader Testing**
   
   **Windows + NVDA (Free)**
   ```
   - Download NVDA from nvaccess.org
   - Navigate using arrow keys
   - Test headings navigation (H key)
   - Test links navigation (K key)
   - Test form controls (F key)
   - Verify all forms have proper labels
   - Check ARIA announcements for dynamic content
   ```

   **macOS + VoiceOver (Built-in)**
   ```
   - Press Cmd+F5 to enable VoiceOver
   - Use VO+Right Arrow to navigate
   - Test rotor navigation (VO+U)
   - Verify form announcements
   ```

3. **Color Contrast**
   ```
   - Use Chrome DevTools color picker
   - Check all text against background
   - Minimum ratios:
     * Normal text: 4.5:1
     * Large text (18pt+): 3:1
     * UI components: 3:1
   ```

4. **Zoom and Reflow**
   ```
   - Test at 200% zoom (Ctrl/Cmd + '+')
   - Test at 400% zoom
   - Verify no horizontal scrolling at narrow widths
   - Test on mobile viewport (320px)
   ```

5. **Forms**
   ```
   - Verify all inputs have labels
   - Test error messages
   - Check that errors are announced
   - Verify required fields are indicated
   - Test with autocomplete disabled
   ```

6. **Reduced Motion**
   ```
   - Enable "Reduce motion" in OS settings
   - Verify animations are minimal/disabled
   - Check that functionality isn't lost
   ```

## Known Issues and Mitigations

### Current Limitations

1. **Stock Images**: Using Unsplash placeholders
   - **Mitigation**: Replace with actual project photos with proper alt text

2. **Map Integration**: Placeholder map on Contact page
   - **Mitigation**: Integrate accessible map (Google Maps with keyboard controls)

## Component-Specific Accessibility

### Header Navigation
- ✅ Semantic `<nav>` element
- ✅ ARIA label on navigation
- ✅ Mobile menu keyboard accessible
- ✅ Focus trap in mobile menu (when open)

### Forms
- ✅ Labels associated with inputs
- ✅ Error messages linked with `aria-describedby`
- ✅ Required fields indicated
- ✅ Validation errors announced
- ✅ Honeypot hidden from screen readers (tabindex="-1")

### Cards and Links
- ✅ Sufficient color contrast
- ✅ Hover/focus states
- ✅ Descriptive link text (no "click here")

### Modals/Dialogs
- ✅ Focus trapped when open
- ✅ Focus returned when closed
- ✅ Escape key closes dialog
- ✅ ARIA roles (dialog, alertdialog)

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Testing Schedule

- **Pre-launch**: Complete full accessibility audit
- **Post-launch**: Monthly spot checks
- **After updates**: Test affected components
- **Annual**: Full WCAG audit

## Contact

Report accessibility issues:
- Email: rubexydesigns@gmail.com
- Subject: "Website Accessibility Issue"

