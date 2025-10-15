import { UserPreferenceJSON } from '../types/preferences';

export function generateLandingPagePrompt(
  userPreferenceJSON: UserPreferenceJSON,
  brandName: string,
  brandTagline: string,
  scope: 'hero-only' | 'full-page'
): string {
  return `
# Persona Definition
You are an expert front-end developer and UI designer specializing in creating high-quality, fully responsive websites tailored to specific brand aesthetics. Your code is clean, semantic, adheres to the highest standards, and prioritizes user experience (UX) and accessibility.

# Goal
${scope === 'hero-only'
  ? 'Create ONLY the full-screen hero section for a landing page based on the provided user preference profile.'
  : 'Create a complete, single-page, fully responsive HTML landing page based on the provided user preference profile.'}

# Technical Requirements
- **Technology:** ${scope === 'hero-only' ? 'Single HTML section' : 'Single index.html file'}
- **Styling:** Use Tailwind CSS (${scope === 'hero-only' ? 'assume CDN is already loaded' : 'via CDN script'})
- **Responsiveness:** Must be fully functional and visually appealing on mobile, tablet, and desktop
${scope === 'full-page' ? '  - Navigation links must collapse into a functional hamburger menu on screens smaller than 768px' : ''}
- **Interactivity:** ${scope === 'hero-only' ? 'Use Alpine.js (via CDN) for any simple toggles if needed' : 'Use Alpine.js (via CDN) for simple toggles like announcement bar close button and mobile menu toggle'}
- **Accessibility:** Include proper semantic HTML, alt text, ARIA labels${scope === 'full-page' ? ', keyboard navigation support' : ''}

# User Preference Profile
${JSON.stringify(userPreferenceJSON, null, 2)}

# Brand Information
- **Brand Name:** ${brandName}
- **Brand Tagline:** ${brandTagline}

# Design Specifications Based on User Preferences

## Color Palette
- **Background:** ${userPreferenceJSON.colorPalette.primaryBackgroundColor}
- **Text:** ${userPreferenceJSON.colorPalette.primaryTextColor}
- **Accent:** ${userPreferenceJSON.colorPalette.accentColor}
- **Secondary Accent:** ${userPreferenceJSON.colorPalette.secondaryAccentColor}
- **Scheme:** ${userPreferenceJSON.colorPalette.schemeType}

## Typography
- **Heading Font:** ${userPreferenceJSON.typography.heading.fontFamily}
- **Heading Weight:** ${userPreferenceJSON.typography.heading.fontWeight}
- **Text Transform:** ${userPreferenceJSON.typography.heading.textTransform}
- **Letter Spacing:** ${userPreferenceJSON.typography.heading.letterSpacing}
- **Body Font:** ${userPreferenceJSON.typography.body.fontFamily}
- **Body Weight:** ${userPreferenceJSON.typography.body.fontWeight}
- **Line Height:** ${userPreferenceJSON.typography.body.lineHeight}
- **Overall Scale:** ${userPreferenceJSON.typography.overallScale}

## Layout
- **Density:** ${userPreferenceJSON.layoutAndStructure.density}
- **Content Flow:** ${userPreferenceJSON.layoutAndStructure.contentFlow}
- **Header Style:** ${userPreferenceJSON.layoutAndStructure.headerSchema.style}
- **Header Layout:** ${userPreferenceJSON.layoutAndStructure.headerSchema.layout}
- **Show Announcement Bar:** ${userPreferenceJSON.layoutAndStructure.headerSchema.showAnnouncementBar}
- **Show Search Bar:** ${userPreferenceJSON.layoutAndStructure.headerSchema.showSearchBar}
- **Footer Layout:** ${userPreferenceJSON.layoutAndStructure.footerSchema.layout}
- **Footer Elements:** ${userPreferenceJSON.layoutAndStructure.footerSchema.elements.join(', ')}

## Components
- **Corner Radius:** ${userPreferenceJSON.componentStyling.cornerRadius} (sharp=0px, rounded=8px, pill=9999px)
- **Button Style:** ${userPreferenceJSON.componentStyling.buttonStyle.variant}
- **Shadow Style:** ${userPreferenceJSON.componentStyling.shadowStyle}
- **Border Style:** ${userPreferenceJSON.componentStyling.borderStyle}

## Imagery
- **Image Framing:** ${userPreferenceJSON.imageryAndMedia.imageFraming}
- **Hero Overlay Type:** ${userPreferenceJSON.imageryAndMedia.heroImageOverlay.type}
- **Hero Overlay Intensity:** ${userPreferenceJSON.imageryAndMedia.heroImageOverlay.intensity}
- **Icon Style:** ${userPreferenceJSON.imageryAndMedia.iconStyle}

## Interactions
- **Use Scroll Animation:** ${userPreferenceJSON.microInteractionsAndAnimation.useScrollAnimation}
- **Scroll Animation Type:** ${userPreferenceJSON.microInteractionsAndAnimation.scrollAnimationType}
- **Hover Effect Type:** ${userPreferenceJSON.microInteractionsAndAnimation.hoverEffect.type}
- **Hover Effect Target:** ${userPreferenceJSON.microInteractionsAndAnimation.hoverEffect.target.join(', ')}

## Aesthetic Mood (Influence overall design feel)
- **Luxury:** ${userPreferenceJSON.aestheticAndMood.primaryMoods.luxury.value}/10
- **Minimalist:** ${userPreferenceJSON.aestheticAndMood.primaryMoods.minimalist.value}/10
- **Corporate:** ${userPreferenceJSON.aestheticAndMood.primaryMoods.corporate.value}/10
- **Playful:** ${userPreferenceJSON.aestheticAndMood.primaryMoods.playful.value}/10
- **Techy:** ${userPreferenceJSON.aestheticAndMood.primaryMoods.techy.value}/10
- **Earthy:** ${userPreferenceJSON.aestheticAndMood.primaryMoods.earthy.value}/10
- **Brutalist:** ${userPreferenceJSON.aestheticAndMood.primaryMoods.brutalist.value}/10

${scope === 'hero-only' ? `
# Component Structure for Hero Section ONLY

Create ONLY the hero section with these elements:
1. **Container:** Full-screen height (min-h-screen), proper padding based on density
2. **Content Area:**
   - Main headline (h1) with brand name
   - Subheadline/tagline (p)
   - Brief description (2-3 sentences about the brand/product)
   - Primary CTA button
   - Secondary CTA button (optional, ghost/outline style)
3. **Visual Element:**
   - Background image/gradient OR
   - Illustration/icon OR
   - Abstract shapes
   (Choose based on aesthetic preferences and imageFraming)
4. **Layout:** Position content based on contentFlow preference (centered for singleColumn, split for grid)

Do NOT include navigation header, footer, or any other page sections.
` : `
# Complete Page Structure

Your landing page must include these sections in order:

## 1. Top Announcement Bar ${userPreferenceJSON.layoutAndStructure.headerSchema.showAnnouncementBar ? '(REQUIRED)' : '(OPTIONAL - Skip if not needed)'}
${userPreferenceJSON.layoutAndStructure.headerSchema.showAnnouncementBar ? `
- Fixed position at top
- Style: ${userPreferenceJSON.layoutAndStructure.headerSchema.style}
- Include close button with Alpine.js toggle (x-data, x-show)
- Example: "Limited Time Offer: 20% Off All Products" or seasonal promotion
- Keep it minimal and on-brand
` : ''}

## 2. Main Navigation Header (REQUIRED)
- Style: ${userPreferenceJSON.layoutAndStructure.headerSchema.style}
- Layout: ${userPreferenceJSON.layoutAndStructure.headerSchema.layout}
- Include:
  - Brand logo/name (text-based logo using brand name)
  - Navigation links: Home, Features, Pricing, About, Contact
  ${userPreferenceJSON.layoutAndStructure.headerSchema.showSearchBar ? '- Search bar with icon' : ''}
  - Primary CTA button (e.g., "Get Started" or "Sign Up")
- **Mobile Responsive:** Hamburger menu for screens < 768px using Alpine.js
  - Use x-data="{ mobileMenuOpen: false }"
  - Toggle button with x-on:click="mobileMenuOpen = !mobileMenuOpen"
  - Menu with x-show="mobileMenuOpen"

## 3. Full-Screen Hero Section (REQUIRED)
- Min height: 100vh
- Include:
  - Main headline with brand name (large, bold, attention-grabbing)
  - Subheadline/tagline (medium, supporting)
  - Brief description (2-3 sentences explaining value proposition)
  - Primary CTA button (solid, prominent)
  - Secondary CTA button (outline/ghost, secondary action)
  - Hero visual element (background image, gradient, or abstract shapes based on preferences)
- Layout matches contentFlow preference
- Overlay matches heroImageOverlay settings

## 4. Features/Services Section (REQUIRED)
- Showcase 3-6 key features or services
- Layout: Use grid (2 or 3 columns on desktop) or single column based on contentFlow
- Each feature includes:
  - Icon (style: ${userPreferenceJSON.imageryAndMedia.iconStyle} - use emoji, SVG icon, or Unicode symbol)
  - Feature title (h3)
  - Brief description (2-3 sentences)
- Spacing matches density preference

## 5. Social Proof Section (OPTIONAL but recommended)
- Choose ONE of:
  - Customer testimonials (2-3 cards with quote, name, role)
  - Client logos (6-8 logos in a grid)
  - Statistics/metrics (3-4 impressive numbers with labels)
- Use cards if testimonials, grid if logos

## 6. Pricing Section (OPTIONAL but recommended)
- 2-3 pricing tiers displayed in cards/columns
- Each tier includes:
  - Plan name
  - Price (with currency and period)
  - Feature list (4-6 items)
  - CTA button
- Highlight the recommended/popular plan

## 7. Final CTA Section (REQUIRED)
- Strong call-to-action before footer
- Large heading asking user to take action
- Brief supporting text
- Primary CTA button (large, prominent)
- Background color contrast with rest of page

## 8. Footer (REQUIRED)
- Layout: ${userPreferenceJSON.layoutAndStructure.footerSchema.layout}
- Elements to include: ${userPreferenceJSON.layoutAndStructure.footerSchema.elements.join(', ')}
- Structure based on layout:
  ${userPreferenceJSON.layoutAndStructure.footerSchema.layout === 'multiColumnWithLogo' ? `
  - Logo and tagline (left column)
  - Link columns: Product, Company, Resources, Support (each 3-5 links)
  ${userPreferenceJSON.layoutAndStructure.footerSchema.elements.includes('socialIcons') ? '- Social media icons (Twitter, Facebook, Instagram, LinkedIn)' : ''}
  ${userPreferenceJSON.layoutAndStructure.footerSchema.elements.includes('newsletterSignup') ? '- Newsletter signup form (email input + button)' : ''}
  - Copyright notice at bottom
  ` : userPreferenceJSON.layoutAndStructure.footerSchema.layout === 'linksWithSocial' ? `
  - Two columns: Links on left, Social icons on right
  - Copyright notice centered at bottom
  ` : `
  - Simple centered copyright text
  `}

## CDN Scripts to Include in <head>
\`\`\`html
<script src="https://cdn.tailwindcss.com"></script>
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
\`\`\`
`}

# Design Quality Guidelines
- **Avoid Generic Templates:** Create unique, custom layouts that feel handcrafted, not template-based
- **Visual Hierarchy:** Use typography scale, spacing, and color contrast to create clear visual hierarchy
- **Brand Personality:** Infuse the design with the brand's unique character and voice
- **Professional Polish:** Every element should feel intentional and refined
- **Modern Standards:** Use contemporary design patterns while avoiding overused trends

# Confidence-Based Priorities
${Object.entries(userPreferenceJSON.aestheticAndMood.primaryMoods)
  .filter(([, mood]: [string, { value: number; confidence: number }]) => mood.confidence > 0.8)
  .map(([moodName, mood]: [string, { value: number; confidence: number }]) => `- **${moodName.charAt(0).toUpperCase() + moodName.slice(1)} (${mood.confidence.toFixed(2)} confidence):** This preference is highly confident - strictly adhere to this aesthetic direction`)
  .join('\n')}

# Design Notes
- **Spacing:** Use ${userPreferenceJSON.layoutAndStructure.density} density (${
  userPreferenceJSON.layoutAndStructure.density === 'spacious' ? 'generous padding/margins (py-20, px-8)' :
  userPreferenceJSON.layoutAndStructure.density === 'compact' ? 'tight spacing (py-8, px-4)' :
  'balanced spacing (py-12, px-6)'
})
- **Shadows:** ${userPreferenceJSON.componentStyling.shadowStyle === 'none' ? 'Flat design, no shadows' :
  userPreferenceJSON.componentStyling.shadowStyle === 'subtle' ? 'Use shadow-sm or shadow-md for depth' :
  'Use shadow-lg or shadow-xl for floating effect'}
- **Borders:** ${userPreferenceJSON.componentStyling.borderStyle === 'none' ? 'No borders' :
  userPreferenceJSON.componentStyling.borderStyle === 'thin' ? 'Use border or border-2' :
  'Use border-4 for prominent borders'}
- **Corner Radius:** Consistently use ${
  userPreferenceJSON.componentStyling.cornerRadius === 'sharp' ? 'rounded-none (0px)' :
  userPreferenceJSON.componentStyling.cornerRadius === 'pill' ? 'rounded-full (9999px)' :
  'rounded-lg (8px)'
} for buttons, cards, images
- **Button Variant:** ${
  userPreferenceJSON.componentStyling.buttonStyle.variant === 'filled' ? 'Solid background with accent color' :
  userPreferenceJSON.componentStyling.buttonStyle.variant === 'outlined' ? 'Transparent background with border' :
  'Text-only with hover underline'
}
- **Aesthetic Mood:** The design should ${
  userPreferenceJSON.aestheticAndMood.primaryMoods.luxury.value > 7 ? 'feel luxurious and premium with elegant typography, refined spacing, and sophisticated color combinations. Use high-quality visual elements and subtle gradients' :
  userPreferenceJSON.aestheticAndMood.primaryMoods.playful.value > 7 ? 'feel fun and energetic with vibrant colors, playful typography, rounded shapes, and interactive elements. Include dynamic visual elements and engaging animations' :
  userPreferenceJSON.aestheticAndMood.primaryMoods.minimalist.value > 7 ? 'feel clean and minimal with plenty of whitespace, simple typography, monochromatic color schemes, and subtle details. Focus on content hierarchy and breathing room' :
  userPreferenceJSON.aestheticAndMood.primaryMoods.techy.value > 7 ? 'feel modern and tech-forward with geometric shapes, sleek typography, futuristic elements, and clean lines. Use bold contrasts and contemporary layouts' :
  userPreferenceJSON.aestheticAndMood.primaryMoods.corporate.value > 7 ? 'feel professional and trustworthy with structured layouts, conservative color palettes, and clear typography. Emphasize credibility and stability' :
  userPreferenceJSON.aestheticAndMood.primaryMoods.earthy.value > 7 ? 'feel natural and organic with earth tones, textured elements, and warm typography. Use natural imagery and organic shapes' :
  userPreferenceJSON.aestheticAndMood.primaryMoods.brutalist.value > 7 ? 'feel bold and raw with stark contrasts, geometric shapes, and industrial aesthetics. Use bold typography and structural elements' :
  'balance professionalism with approachability, using clean layouts and friendly but credible design elements'
}
${userPreferenceJSON.microInteractionsAndAnimation.useScrollAnimation ? `
- **Animations:** Include subtle ${userPreferenceJSON.microInteractionsAndAnimation.scrollAnimationType} animations on scroll to enhance user engagement
` : ''}
- **Hover Effects:** Apply ${userPreferenceJSON.microInteractionsAndAnimation.hoverEffect.type} hover effects to ${userPreferenceJSON.microInteractionsAndAnimation.hoverEffect.target.join(' and ')}

# Anti-Generic Design Principles
- **Unique Layouts:** Avoid common template patterns like centered hero sections with generic CTA buttons
- **Custom Visual Elements:** Create distinctive visual elements that reflect the brand's personality
- **Thoughtful Typography:** Use typography combinations that feel curated, not randomly selected
- **Intentional Color Usage:** Apply colors purposefully to create mood and hierarchy
- **Brand-Specific Details:** Include unique touches that make the design feel custom-made
- **Avoid AI Clichés:** Steer clear of overused AI-generated design patterns like:
  - Generic gradient backgrounds without purpose
  - Overly symmetrical layouts that feel robotic
  - Cliché iconography and stock photo aesthetics
  - Predictable button styles and hover effects
  - Template-like section arrangements

# Content Guidelines
- Use placeholder text that makes sense for the brand
- Keep copy concise and scannable
- Ensure visual hierarchy is clear
- Use semantic HTML (header, nav, main, section, footer, article)
- Include appropriate alt text for images/icons
- Ensure color contrast meets WCAG AA standards

# Output Instructions
**CRITICAL:** Your response must contain ONLY the ${scope === 'hero-only' ? 'hero section HTML' : 'complete HTML document'} within a single markdown code block. Do not include any introductory text, explanations, or concluding sentences. Just the code.

${scope === 'hero-only' ? `
Return ONLY the hero section HTML like this:
\`\`\`html
<section class="min-h-screen ...">
  <!-- Hero section content only -->
</section>
\`\`\`
` : `
Return the complete HTML document like this:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName} - ${brandTagline}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
  <!-- All sections here -->
</body>
</html>
\`\`\`
`}
`;
}

export function generateRefinementPrompt(
  userPreferenceJSON: UserPreferenceJSON,
  currentHeroCode: string,
  userFeedback: string,
  brandName: string,
  brandTagline: string
): string {
  return `
# Context
You are refining a landing page hero section based on user feedback. The user wants to make changes while maintaining the overall design system.

# Current User Preference Profile
${JSON.stringify(userPreferenceJSON, null, 2)}

# Brand Information
- **Brand Name:** ${brandName}
- **Brand Tagline:** ${brandTagline}

# Current Hero Section Code
\`\`\`html
${currentHeroCode}
\`\`\`

# User Feedback
"${userFeedback}"

# Task
Modify the hero section HTML to incorporate the user's feedback while:
1. Maintaining consistency with the overall design system (colors, typography, spacing, component styling)
2. Preserving the responsive design and accessibility
3. Keeping the same general structure unless the feedback specifically requests structural changes
4. Following all the design specifications from the preference profile

# Interpretation Guidelines
- "Make it more minimal" → Reduce visual elements, increase whitespace, simplify colors to monochrome
- "Add more color" → Introduce gradients, colorful accents, vibrant backgrounds
- "Make it darker" → Switch to dark color scheme with light text
- "Make it lighter" → Switch to light color scheme with dark text
- "More professional" → Increase corporate feel, reduce playfulness, use serif fonts
- "More playful" → Add rounded shapes, vibrant colors, fun typography
- "More modern" → Add tech elements, clean lines, contemporary sans-serif fonts
- "Add gradient" → Apply gradient backgrounds or overlays
- "More whitespace" → Increase padding and margins significantly
- "Larger text" → Increase font sizes for headings and body
- "Add image" → Include background image or hero image
- "Remove image" → Use solid color or gradient background only

# Output Instructions
**CRITICAL:** Your response must contain ONLY the updated hero section HTML within a single markdown code block. Do not include any introductory text, explanations, or concluding sentences. Just the code.

\`\`\`html
<section class="min-h-screen ...">
  <!-- Updated hero section content -->
</section>
\`\`\`
`;
}
