# 🎨 WHITE WINGS VISA - DESIGN SYSTEM GUIDE

## Overview
This design system ensures consistency across the entire White Wings Visa website while maintaining the existing design and functionality. It establishes a professional hierarchy for typography, buttons, cards, icons, and all UI components.

## 🎯 Design Principles
- **Consistency**: All elements follow the same design patterns
- **Hierarchy**: Clear visual hierarchy through typography and spacing
- **Accessibility**: High contrast and readable text
- **Professional**: Enterprise-level design quality
- **Responsive**: Works perfectly on all devices

## 🔤 Typography System

### Font Family
- **Primary**: Gilroy (all weights: 300, 400, 500, 600, 700, 800)
- **Fallback**: -apple-system, BlinkMacSystemFont, sans-serif

### Heading Hierarchy
```css
h1 (.ww-heading-1): 48px, Bold (700), Black color
h2 (.ww-heading-2): 36px, Semibold (600), Black color  
h3 (.ww-heading-3): 30px, Semibold (600), Black color
h4 (.ww-heading-4): 24px, Medium (500), Dark gray
h5 (.ww-heading-5): 20px, Medium (500), Dark gray
h6 (.ww-heading-6): 18px, Medium (500), Medium gray
```

### Body Text
```css
Large Text (.ww-text-large): 20px, Regular (400)
Body Text (p, .ww-text-body): 16px, Regular (400)
Small Text (.ww-text-small): 14px, Regular (400)
Caption (.ww-text-caption): 12px, Regular (400)
```

### Text Emphasis
```css
Bold (.ww-text-bold): Bold (700), Black color
Semibold (.ww-text-semibold): Semibold (600)
Medium (.ww-text-medium): Medium (500)
```

## 🔘 Button System

### Primary CTA Buttons
```css
.ww-btn-primary, .btn-primary, .btn-apply-now, .apply-btn
- Size: 16px text, 16px×32px padding
- Style: Gradient background (#D9EAFD to #BCCCDC)
- Weight: Semibold (600)
- Radius: 12px
- Shadow: Medium elevation
- Hover: Darker gradient + lift effect
```

### Secondary Buttons
```css
.ww-btn-secondary, .btn-secondary
- Size: 16px text, 16px×32px padding
- Style: Light background with border
- Weight: Semibold (600)
- Border: 2px solid #BCCCDC
- Hover: Background change + border color
```

### Button Sizes
```css
Large (.ww-btn-large): 18px text, 20px×48px padding
Standard: 16px text, 16px×32px padding
Small (.ww-btn-small): 14px text, 8px×24px padding
```

## 🃏 Card System

### Standard Cards
```css
.ww-card, .card, .service-card, .feature-card
- Padding: 32px
- Background: White
- Radius: 16px
- Border: 1px solid #BCCCDC
- Shadow: Large elevation
- Hover: Extra large shadow + 4px lift + border color change
```

### Card Variants
```css
Compact (.ww-card-compact): 24px padding
Large (.ww-card-large): 48px padding
```

## 🎨 Icon System

### Icon Sizes
```css
Small (.ww-icon-sm): 16px, 16px×16px
Medium (.ww-icon-md): 20px, 24px×24px  
Large (.ww-icon-lg): 30px, 48px×48px
```

### Icon Colors
```css
Primary (.ww-icon-primary): #9AA6B2
Secondary (.ww-icon-secondary): #2d2d2d
Accent (.ww-icon-accent): #BCCCDC
```

## 🎨 Color Palette

### Primary Colors
```css
--ww-primary-50: #F8FAFC (Lightest - backgrounds)
--ww-primary-100: #D9EAFD (Light - hero sections)
--ww-primary-200: #BCCCDC (Medium - cards, borders)
--ww-primary-300: #9AA6B2 (Dark - accents, icons)
```

### Text Colors
```css
--ww-text-primary: #1a1a1a (Main text)
--ww-text-secondary: #2d2d2d (Secondary text)
--ww-text-tertiary: #404040 (Tertiary text)
--ww-text-contrast: #000000 (Headings, emphasis)
```

## 📐 Spacing System

### Spacing Scale
```css
--ww-space-1: 4px
--ww-space-2: 8px
--ww-space-3: 12px
--ww-space-4: 16px (Base unit)
--ww-space-5: 20px
--ww-space-6: 24px
--ww-space-8: 32px
--ww-space-10: 40px
--ww-space-12: 48px
--ww-space-16: 64px
--ww-space-20: 80px
```

## 🔄 Form System

### Form Elements
```css
Input/Textarea/Select:
- Font: Gilroy, 16px, Regular (400)
- Padding: 16px
- Border: 2px solid #BCCCDC
- Radius: 12px
- Background: #F8FAFC
- Focus: Border #9AA6B2 + shadow
```

### Labels
```css
- Font: Gilroy, 14px, Medium (500)
- Color: #2d2d2d
- Margin: 8px bottom
```

## 📱 Responsive Behavior

### Mobile Adjustments (≤768px)
```css
h1: 36px (reduced from 48px)
h2: 30px (reduced from 36px)
h3: 24px (reduced from 30px)
Buttons: 14px text, 12px×24px padding
Cards: 24px padding (reduced from 32px)
```

## 🛠️ Implementation

### CSS Classes Available
- Typography: `.ww-heading-1` to `.ww-heading-6`, `.ww-text-body`, `.ww-text-large`, etc.
- Buttons: `.ww-btn-primary`, `.ww-btn-secondary`, `.ww-btn-large`, `.ww-btn-small`
- Cards: `.ww-card`, `.ww-card-compact`, `.ww-card-large`
- Icons: `.ww-icon-sm`, `.ww-icon-md`, `.ww-icon-lg`
- Spacing: `.ww-mb-4`, `.ww-mt-6`, `.ww-p-8`, etc.

### Automatic Application
The design system automatically applies to existing elements:
- All `h1-h6` tags follow the heading hierarchy
- All `button`, `.btn` classes follow button system
- All `.card` classes follow card system
- All icons follow icon system

## ✅ Quality Assurance

### Consistency Checks
- ✅ All text uses Gilroy font family
- ✅ All headings follow size and weight hierarchy
- ✅ All buttons have consistent styling and behavior
- ✅ All cards have uniform appearance and interactions
- ✅ All icons follow size and color standards
- ✅ All spacing follows the defined scale
- ✅ All colors match the approved palette

### Accessibility
- ✅ High contrast text colors for readability
- ✅ Consistent focus states for keyboard navigation
- ✅ Proper heading hierarchy for screen readers
- ✅ Adequate touch targets for mobile devices

## 🚀 Usage Examples

### Typography
```html
<h1 class="ww-heading-1">Main Page Title</h1>
<h2 class="ww-heading-2">Section Heading</h2>
<p class="ww-text-body">Regular paragraph text</p>
<span class="ww-text-small">Small supporting text</span>
```

### Buttons
```html
<button class="ww-btn-primary">Apply Now</button>
<button class="ww-btn-secondary">Learn More</button>
<button class="ww-btn-primary ww-btn-large">Get Started</button>
```

### Cards
```html
<div class="ww-card">
    <h3>Card Title</h3>
    <p>Card content goes here</p>
</div>
```

### Icons
```html
<i class="ri-phone-line ww-icon-md ww-icon-primary"></i>
<i class="ri-mail-line ww-icon-lg ww-icon-accent"></i>
```

This design system ensures professional consistency while maintaining all existing functionality and design elements.
