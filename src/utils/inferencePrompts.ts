import { SwipeResult } from '../types/preferences';

export function generateInferencePrompt(swipeResults: SwipeResult[]): string {
  const likedBrands = swipeResults.filter(result => result.liked);
  const dislikedBrands = swipeResults.filter(result => !result.liked);

  const formatBrandDesign = (brand: SwipeResult) => {
    return `
Brand: ${brand.brandName}
Status: ${brand.liked ? 'LIKED' : 'DISLIKED'}
Design Attributes:
- Aesthetic Moods:
  - luxury: ${brand.brandDesign.aestheticAndMood.primaryMoods.luxury}/10
  - minimalist: ${brand.brandDesign.aestheticAndMood.primaryMoods.minimalist}/10
  - corporate: ${brand.brandDesign.aestheticAndMood.primaryMoods.corporate}/10
  - playful: ${brand.brandDesign.aestheticAndMood.primaryMoods.playful}/10
  - techy: ${brand.brandDesign.aestheticAndMood.primaryMoods.techy}/10
  - earthy: ${brand.brandDesign.aestheticAndMood.primaryMoods.earthy}/10
  - brutalist: ${brand.brandDesign.aestheticAndMood.primaryMoods.brutalist}/10
- Secondary Qualities:
  - modern: ${brand.brandDesign.aestheticAndMood.secondaryQualities.modern}/10
  - classic: ${brand.brandDesign.aestheticAndMood.secondaryQualities.classic}/10
  - nostalgic: ${brand.brandDesign.aestheticAndMood.secondaryQualities.nostalgic}/10
  - futuristic: ${brand.brandDesign.aestheticAndMood.secondaryQualities.futuristic}/10
  - handmade: ${brand.brandDesign.aestheticAndMood.secondaryQualities.handmade}/10
- Layout & Structure:
  - density: ${brand.brandDesign.layoutAndStructure.density}
  - contentFlow: ${brand.brandDesign.layoutAndStructure.contentFlow}
  - headerSchema.style: ${brand.brandDesign.layoutAndStructure.headerSchema.style}
  - headerSchema.layout: ${brand.brandDesign.layoutAndStructure.headerSchema.layout}
  - showAnnouncementBar: ${brand.brandDesign.layoutAndStructure.headerSchema.showAnnouncementBar}
  - showSearchBar: ${brand.brandDesign.layoutAndStructure.headerSchema.showSearchBar}
  - footerSchema.layout: ${brand.brandDesign.layoutAndStructure.footerSchema.layout}
  - footerSchema.elements: [${brand.brandDesign.layoutAndStructure.footerSchema.elements.join(', ')}]
- Color Palette:
  - schemeType: ${brand.brandDesign.colorPalette.schemeType}
  - primaryBackgroundColor: ${brand.brandDesign.colorPalette.primaryBackgroundColor}
  - primaryTextColor: ${brand.brandDesign.colorPalette.primaryTextColor}
  - accentColor: ${brand.brandDesign.colorPalette.accentColor}
  - secondaryAccentColor: ${brand.brandDesign.colorPalette.secondaryAccentColor}
- Typography:
  - heading.fontFamily: ${brand.brandDesign.typography.heading.fontFamily}
  - heading.fontWeight: ${brand.brandDesign.typography.heading.fontWeight}
  - heading.letterSpacing: ${brand.brandDesign.typography.heading.letterSpacing}
  - heading.textTransform: ${brand.brandDesign.typography.heading.textTransform}
  - body.fontFamily: ${brand.brandDesign.typography.body.fontFamily}
  - body.fontWeight: ${brand.brandDesign.typography.body.fontWeight}
  - body.lineHeight: ${brand.brandDesign.typography.body.lineHeight}
  - overallScale: ${brand.brandDesign.typography.overallScale}
- Component Styling:
  - cornerRadius: ${brand.brandDesign.componentStyling.cornerRadius}
  - buttonStyle.variant: ${brand.brandDesign.componentStyling.buttonStyle.variant}
  - shadowStyle: ${brand.brandDesign.componentStyling.shadowStyle}
  - borderStyle: ${brand.brandDesign.componentStyling.borderStyle}
- Imagery & Media:
  - imageFraming: ${brand.brandDesign.imageryAndMedia.imageFraming}
  - heroImageOverlay.type: ${brand.brandDesign.imageryAndMedia.heroImageOverlay.type}
  - heroImageOverlay.intensity: ${brand.brandDesign.imageryAndMedia.heroImageOverlay.intensity}
  - iconStyle: ${brand.brandDesign.imageryAndMedia.iconStyle}
- Micro Interactions:
  - useScrollAnimation: ${brand.brandDesign.microInteractionsAndAnimation.useScrollAnimation}
  - scrollAnimationType: ${brand.brandDesign.microInteractionsAndAnimation.scrollAnimationType}
  - hoverEffect.target: [${brand.brandDesign.microInteractionsAndAnimation.hoverEffect.target.join(', ')}]
  - hoverEffect.type: ${brand.brandDesign.microInteractionsAndAnimation.hoverEffect.type}
`;
  };

  return `
You are an advanced landing page design inference system. Your task is to analyze user swipe preferences and generate a complete JSON configuration for their ideal landing page.

# USER SWIPE DATA

## LIKED BRANDS (${likedBrands.length} brands):
${likedBrands.map(formatBrandDesign).join('\n')}

## DISLIKED BRANDS (${dislikedBrands.length} brands):
${dislikedBrands.map(formatBrandDesign).join('\n')}

# INFERENCE TASK

Perform a complete design preference inference following these steps:

## STEP 1: CALCULATE AVERAGES

For all LIKED pages, calculate the average score for each aesthetic mood:
- luxury: (sum of all luxury scores) / ${likedBrands.length}
- minimalist: (sum of all minimalist scores) / ${likedBrands.length}
- corporate: (sum of all corporate scores) / ${likedBrands.length}
- playful: (sum of all playful scores) / ${likedBrands.length}
- techy: (sum of all techy scores) / ${likedBrands.length}
- earthy: (sum of all earthy scores) / ${likedBrands.length}
- brutalist: (sum of all brutalist scores) / ${likedBrands.length}

**Show your calculations explicitly.**

## STEP 2: FREQUENCY ANALYSIS

For all LIKED pages, count the frequency of each visual feature:

- contentFlow: Count how many are "singleColumn" vs "grid" vs "asymmetrical"
- density: Count "spacious" vs "standard" vs "compact"
- headerSchema.style: Count "fixed" vs "sticky" vs "static"
- headerSchema.layout: Count each type
- colorPalette.schemeType: Count each type
- typography.heading.fontFamily: Count each type
- componentStyling.cornerRadius: Count each type
- componentStyling.buttonStyle.variant: Count each type
- componentStyling.shadowStyle: Count each type

**Show frequency counts like: "singleColumn: 6/7 (86%)"**

## STEP 3: CALCULATE CONFIDENCE SCORES

For each parameter, calculate confidence (0-1 scale):

**For aesthetic scores:**
- If standard deviation is low (scores are similar): confidence = 0.85-0.95
- If standard deviation is medium: confidence = 0.70-0.85
- If standard deviation is high (scores vary widely): confidence = 0.50-0.70

**For visual features:**
- If frequency ≥ 85%: confidence = 0.90-1.0
- If frequency 70-85%: confidence = 0.75-0.90
- If frequency 55-70%: confidence = 0.65-0.75
- If frequency < 55%: confidence = 0.40-0.65

## STEP 4: IDENTIFY LOW-CONFIDENCE PARAMETERS

List all parameters with confidence < 0.70. These will need AI reasoning.

## STEP 5: AI REASONING

For each low-confidence parameter, provide:
1. The data distribution
2. Analysis of user preferences
3. Your reasoning for the final choice
4. Confidence score

Example format:
\`\`\`
Parameter: colorScheme
Data: vibrant:3/7 (43%), lightMonochrome:2/7 (29%), dark:1/7, light:1/7
Analysis: User likes both vibrant fun designs AND clean minimal designs
Reasoning: Choose "light" as a neutral base that can support both colorful accents and clean aesthetics
Decision: "light"
Confidence: 0.72
\`\`\`

## STEP 6: GENERATE FINAL JSON

Output the complete JSON configuration in this EXACT format:
\`\`\`json
{
  "metadata": {
    "profileId": "INFERRED_PROFILE_[UNIQUE_ID]",
    "userId": "USER_PREFERENCES_001",
    "createdAt": "[CURRENT_TIMESTAMP]",
    "schemaVersion": "2.1",
    "inference": {
      "method": "hybrid",
      "confidence": [OVERALL_CONFIDENCE_0_TO_1],
      "totalSwipes": ${swipeResults.length},
      "likedCount": ${likedBrands.length},
      "dislikedCount": ${dislikedBrands.length},
      "aiRefined": ["[PARAM1]", "[PARAM2]", ...]
    }
  },
  "aestheticAndMood": {
    "primaryMoods": {
      "luxury": {
        "value": [0-10],
        "confidence": [0-1]
      },
      "minimalist": {
        "value": [0-10],
        "confidence": [0-1]
      },
      "corporate": {
        "value": [0-10],
        "confidence": [0-1]
      },
      "playful": {
        "value": [0-10],
        "confidence": [0-1]
      },
      "techy": {
        "value": [0-10],
        "confidence": [0-1]
      },
      "earthy": {
        "value": [0-10],
        "confidence": [0-1]
      },
      "brutalist": {
        "value": [0-10],
        "confidence": [0-1]
      }
    },
    "secondaryQualities": {
      "modern": [0-10],
      "classic": [0-10],
      "nostalgic": [0-10],
      "futuristic": [0-10],
      "handmade": [0-10]
    }
  },
  "layoutAndStructure": {
    "density": "[spacious/standard/compact]",
    "contentFlow": "[singleColumn/grid/asymmetrical]",
    "headerSchema": {
      "style": "[fixed/sticky/static]",
      "layout": "[threeColumnLogoCenter/logoLeftNavRight/stackedCenter]",
      "showAnnouncementBar": [true/false],
      "showSearchBar": [true/false]
    },
    "footerSchema": {
      "layout": "[simpleCopyright/linksWithSocial/multiColumnWithLogo]",
      "elements": ["logo", "socialIcons", "linkColumns", "copyright"]
    }
  },
  "colorPalette": {
    "schemeType": "[light/dark/lightMonochrome/darkMonochrome/vibrant/earthTones]",
    "primaryBackgroundColor": "#FFFFFF",
    "primaryTextColor": "#333333",
    "accentColor": "#[HEX]",
    "secondaryAccentColor": "#F0F0F0"
  },
  "typography": {
    "heading": {
      "fontFamily": "[serif/sans-serif/script/display]",
      "fontWeight": "[light/normal/medium/bold]",
      "letterSpacing": "[tight/normal/wide]",
      "textTransform": "[none/uppercase/capitalize]"
    },
    "body": {
      "fontFamily": "[serif/sans-serif]",
      "fontWeight": "[light/normal/medium/bold]",
      "lineHeight": "[tight/normal/relaxed]"
    },
    "overallScale": "[small/standard/large]"
  },
  "componentStyling": {
    "cornerRadius": "[sharp/rounded/pill]",
    "buttonStyle": {
      "variant": "[filled/outlined/textLink]"
    },
    "shadowStyle": "[none/subtle/deep]",
    "borderStyle": "[none/thin/thick]"
  },
  "imageryAndMedia": {
    "imageFraming": "[fullBleed/card/contained]",
    "heroImageOverlay": {
      "type": "[none/darkGradient/lightGradient/colorWash]",
      "intensity": [0-1]
    },
    "iconStyle": "[lineArt/filled/duoTone]"
  },
  "microInteractionsAndAnimation": {
    "useScrollAnimation": [true/false],
    "scrollAnimationType": "[none/fadeInUp/slideInLeft/zoomIn]",
    "hoverEffect": {
      "target": ["buttons", "navigationLinks"],
      "type": "[none/colorChange/scale/lift]"
    }
  }
}
\`\`\`

# IMPORTANT INSTRUCTIONS

1. **Follow all 6 steps in order** - do not skip any step
2. **Show all calculations explicitly** - make your reasoning transparent
3. **Use exact JSON format** - ensure the output matches the schema exactly
4. **Include all required fields** - do not omit any parameters
5. **Use realistic confidence scores** - base them on actual data analysis
6. **Generate unique profileId** - use format: "INFERRED_PROFILE_" + timestamp or random string
7. **Use current timestamp** - format: "YYYY-MM-DDTHH:mm:ss.sssZ"
8. **List AI-refined parameters** - include all parameters that required reasoning in Step 5

# CRITICAL OUTPUT FORMAT

Your response MUST end with a JSON code block using this EXACT format:

\`\`\`json
{
  "metadata": { ... },
  "aestheticAndMood": { ... },
  ...
}
\`\`\`

**IMPORTANT**: 
- The JSON MUST be wrapped in a markdown code block with "json" language identifier
- All numeric values MUST be actual numbers, not strings (e.g., 0.5 not "0.5")
- The "intensity" field in heroImageOverlay MUST be a decimal number between 0 and 1
- Do NOT include any text after the closing \`\`\` of the JSON code block

Your response should contain:
1. Steps 1-5 with your analysis and reasoning
2. The final JSON configuration in a properly formatted code block
`;
}