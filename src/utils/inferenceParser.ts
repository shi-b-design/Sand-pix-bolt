import { UserPreferenceJSON } from '../types/preferences';

export interface ParsingResult {
  success: boolean;
  data?: UserPreferenceJSON;
  error?: string;
}

export function parseInferenceResponse(aiResponse: string): ParsingResult {
  try {
    console.log('=== Raw AI Response (first 500 chars) ===');
    console.log(aiResponse.substring(0, 500));
    
    // Extract JSON from markdown code blocks
    const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      const jsonString = jsonMatch[1].trim();
      const parsed = JSON.parse(jsonString);
      return validateUserPreferenceJSON(parsed);
    }
    
    // Try without language specification
    const fallbackMatch = aiResponse.match(/```\s*([\s\S]*?)\s*```/);
    if (fallbackMatch) {
      const jsonString = fallbackMatch[1].trim();
      const parsed = JSON.parse(jsonString);
      return validateUserPreferenceJSON(parsed);
    }
    
    // Try to find JSON object directly (without code blocks)
    const jsonObjectMatch = aiResponse.match(/\{[\s\S]*"metadata"[\s\S]*\}/);
    if (jsonObjectMatch) {
      console.log('Found JSON object without code blocks');
      const parsed = JSON.parse(jsonObjectMatch[0]);
      return validateUserPreferenceJSON(parsed);
    }
    
    throw new Error('No JSON code block found in AI response');
  } catch (error) {
    console.error('=== JSON Parsing Error ===');
    console.error(error);
    return {
      success: false,
      error: `Failed to parse AI response: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

function validateUserPreferenceJSON(data: unknown): ParsingResult {
  try {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Data must be an object');
    }

    const obj = data as Record<string, unknown>;
    
    // Check required top-level properties
    const requiredProperties = [
      'metadata',
      'aestheticAndMood',
      'layoutAndStructure',
      'colorPalette',
      'typography',
      'componentStyling',
      'imageryAndMedia',
      'microInteractionsAndAnimation'
    ];

    for (const prop of requiredProperties) {
      if (!obj[prop]) {
        throw new Error(`Missing required property: ${prop}`);
      }
    }

    // Validate metadata structure
    validateMetadata(obj.metadata);

    // Validate aestheticAndMood structure
    validateAestheticAndMood(obj.aestheticAndMood);

    // Validate layoutAndStructure structure
    validateLayoutAndStructure(obj.layoutAndStructure);

    // Validate colorPalette structure
    validateColorPalette(obj.colorPalette);

    // Validate typography structure
    validateTypography(obj.typography);

    // Validate componentStyling structure
    validateComponentStyling(obj.componentStyling);

    // Validate imageryAndMedia structure
    validateImageryAndMedia(obj.imageryAndMedia);

    // Validate microInteractionsAndAnimation structure
    validateMicroInteractionsAndAnimation(obj.microInteractionsAndAnimation);

    return {
      success: true,
      data: obj as unknown as UserPreferenceJSON
    };
  } catch (error) {
    return {
      success: false,
      error: `Validation failed: ${error instanceof Error ? error.message : 'Unknown validation error'}`
    };
  }
}

function validateMetadata(metadata: unknown): void {
  if (typeof metadata !== 'object' || metadata === null) {
    throw new Error('metadata must be an object');
  }

  const meta = metadata as Record<string, unknown>;
  
  if (!meta.profileId || typeof meta.profileId !== 'string') {
    throw new Error('metadata.profileId is required and must be a string');
  }
  if (!meta.userId || typeof meta.userId !== 'string') {
    throw new Error('metadata.userId is required and must be a string');
  }
  if (!meta.createdAt || typeof meta.createdAt !== 'string') {
    throw new Error('metadata.createdAt is required and must be a string');
  }
  if (!meta.schemaVersion || typeof meta.schemaVersion !== 'string') {
    throw new Error('metadata.schemaVersion is required and must be a string');
  }
  if (!meta.inference || typeof meta.inference !== 'object') {
    throw new Error('metadata.inference is required and must be an object');
  }
  
  const inference = meta.inference as Record<string, unknown>;
  if (typeof inference.confidence !== 'number' || inference.confidence < 0 || inference.confidence > 1) {
    throw new Error('metadata.inference.confidence must be a number between 0 and 1');
  }
  if (typeof inference.totalSwipes !== 'number') {
    throw new Error('metadata.inference.totalSwipes must be a number');
  }
  if (typeof inference.likedCount !== 'number') {
    throw new Error('metadata.inference.likedCount must be a number');
  }
  if (typeof inference.dislikedCount !== 'number') {
    throw new Error('metadata.inference.dislikedCount must be a number');
  }
  if (!Array.isArray(inference.aiRefined)) {
    throw new Error('metadata.inference.aiRefined must be an array');
  }
}

function validateAestheticAndMood(aestheticAndMood: unknown): void {
  if (typeof aestheticAndMood !== 'object' || aestheticAndMood === null) {
    throw new Error('aestheticAndMood must be an object');
  }

  const aesthetic = aestheticAndMood as Record<string, unknown>;
  
  if (!aesthetic.primaryMoods || typeof aesthetic.primaryMoods !== 'object') {
    throw new Error('aestheticAndMood.primaryMoods is required and must be an object');
  }
  
  const moods = ['luxury', 'minimalist', 'corporate', 'playful', 'techy', 'earthy', 'brutalist'];
  const primaryMoods = aesthetic.primaryMoods as Record<string, unknown>;
  
  for (const mood of moods) {
    if (!primaryMoods[mood] || typeof primaryMoods[mood] !== 'object') {
      throw new Error(`aestheticAndMood.primaryMoods.${mood} is required and must be an object`);
    }
    const moodObj = primaryMoods[mood] as Record<string, unknown>;
    if (typeof moodObj.value !== 'number' || moodObj.value < 0 || moodObj.value > 10) {
      throw new Error(`aestheticAndMood.primaryMoods.${mood}.value must be a number between 0 and 10`);
    }
    if (typeof moodObj.confidence !== 'number' || moodObj.confidence < 0 || moodObj.confidence > 1) {
      throw new Error(`aestheticAndMood.primaryMoods.${mood}.confidence must be a number between 0 and 1`);
    }
  }

  if (!aesthetic.secondaryQualities || typeof aesthetic.secondaryQualities !== 'object') {
    throw new Error('aestheticAndMood.secondaryQualities is required and must be an object');
  }
  
  const qualities = ['modern', 'classic', 'nostalgic', 'futuristic', 'handmade'];
  const secondaryQualities = aesthetic.secondaryQualities as Record<string, unknown>;
  
  for (const quality of qualities) {
    if (typeof secondaryQualities[quality] !== 'number' || 
        (secondaryQualities[quality] as number) < 0 || 
        (secondaryQualities[quality] as number) > 10) {
      throw new Error(`aestheticAndMood.secondaryQualities.${quality} must be a number between 0 and 10`);
    }
  }
}

function validateLayoutAndStructure(layoutAndStructure: unknown): void {
  if (typeof layoutAndStructure !== 'object' || layoutAndStructure === null) {
    throw new Error('layoutAndStructure must be an object');
  }

  const layout = layoutAndStructure as Record<string, unknown>;
  const requiredFields = ['density', 'contentFlow', 'headerSchema', 'footerSchema'];
  
  for (const field of requiredFields) {
    if (!layout[field]) {
      throw new Error(`layoutAndStructure.${field} is required`);
    }
  }

  const headerSchema = layout.headerSchema as Record<string, unknown>;
  if (!headerSchema.style || !headerSchema.layout) {
    throw new Error('headerSchema.style and headerSchema.layout are required');
  }
  if (typeof headerSchema.showAnnouncementBar !== 'boolean') {
    throw new Error('headerSchema.showAnnouncementBar must be a boolean');
  }
  if (typeof headerSchema.showSearchBar !== 'boolean') {
    throw new Error('headerSchema.showSearchBar must be a boolean');
  }

  const footerSchema = layout.footerSchema as Record<string, unknown>;
  if (!footerSchema.layout) {
    throw new Error('footerSchema.layout is required');
  }
  if (!Array.isArray(footerSchema.elements)) {
    throw new Error('footerSchema.elements must be an array');
  }
}

function validateColorPalette(colorPalette: unknown): void {
  if (typeof colorPalette !== 'object' || colorPalette === null) {
    throw new Error('colorPalette must be an object');
  }

  const colors = colorPalette as Record<string, unknown>;
  const requiredFields = ['schemeType', 'primaryBackgroundColor', 'primaryTextColor', 'accentColor', 'secondaryAccentColor'];
  
  for (const field of requiredFields) {
    if (!colors[field]) {
      throw new Error(`colorPalette.${field} is required`);
    }
  }
  
  // Validate hex colors
  const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
  const colorFields = ['primaryBackgroundColor', 'primaryTextColor', 'accentColor', 'secondaryAccentColor'];
  
  for (const field of colorFields) {
    if (typeof colors[field] !== 'string' || !hexColorRegex.test(colors[field] as string)) {
      throw new Error(`colorPalette.${field} must be a valid hex color (e.g., #FFFFFF)`);
    }
  }
}

function validateTypography(typography: unknown): void {
  if (typeof typography !== 'object' || typography === null) {
    throw new Error('typography must be an object');
  }

  const typo = typography as Record<string, unknown>;
  const requiredFields = ['heading', 'body', 'overallScale'];
  
  for (const field of requiredFields) {
    if (!typo[field]) {
      throw new Error(`typography.${field} is required`);
    }
  }

  const heading = typo.heading as Record<string, unknown>;
  const headingRequiredFields = ['fontFamily', 'fontWeight', 'letterSpacing', 'textTransform'];
  
  for (const field of headingRequiredFields) {
    if (!heading[field]) {
      throw new Error(`typography.heading.${field} is required`);
    }
  }

  const body = typo.body as Record<string, unknown>;
  const bodyRequiredFields = ['fontFamily', 'fontWeight', 'lineHeight'];
  
  for (const field of bodyRequiredFields) {
    if (!body[field]) {
      throw new Error(`typography.body.${field} is required`);
    }
  }
}

function validateComponentStyling(componentStyling: unknown): void {
  if (typeof componentStyling !== 'object' || componentStyling === null) {
    throw new Error('componentStyling must be an object');
  }

  const styling = componentStyling as Record<string, unknown>;
  const requiredFields = ['cornerRadius', 'buttonStyle', 'shadowStyle', 'borderStyle'];
  
  for (const field of requiredFields) {
    if (!styling[field]) {
      throw new Error(`componentStyling.${field} is required`);
    }
  }

  const buttonStyle = styling.buttonStyle as Record<string, unknown>;
  if (!buttonStyle.variant) {
    throw new Error('componentStyling.buttonStyle.variant is required');
  }
}

function validateImageryAndMedia(imageryAndMedia: unknown): void {
  if (typeof imageryAndMedia !== 'object' || imageryAndMedia === null) {
    throw new Error('imageryAndMedia must be an object');
  }

  const imagery = imageryAndMedia as Record<string, unknown>;
  const requiredFields = ['imageFraming', 'heroImageOverlay', 'iconStyle'];
  
  for (const field of requiredFields) {
    if (!imagery[field]) {
      throw new Error(`imageryAndMedia.${field} is required`);
    }
  }

  const heroImageOverlay = imagery.heroImageOverlay as Record<string, unknown>;
  if (!heroImageOverlay.type) {
    throw new Error('imageryAndMedia.heroImageOverlay.type is required');
  }
  
  // Convert intensity to number if it's a string
  let intensity = heroImageOverlay.intensity;
  if (typeof intensity === 'string') {
    intensity = parseFloat(intensity);
    heroImageOverlay.intensity = intensity; // Update the value
  }
  
  if (typeof intensity !== 'number' || isNaN(intensity as number)) {
    throw new Error('imageryAndMedia.heroImageOverlay.intensity must be a number');
  }
  
  // Clamp the value between 0 and 1
  const intensityNum = intensity as number;
  if (intensityNum < 0 || intensityNum > 1) {
    console.warn(`heroImageOverlay.intensity was ${intensityNum}, clamping to 0-1 range`);
    heroImageOverlay.intensity = Math.max(0, Math.min(1, intensityNum));
  }
}

function validateMicroInteractionsAndAnimation(microInteractionsAndAnimation: unknown): void {
  if (typeof microInteractionsAndAnimation !== 'object' || microInteractionsAndAnimation === null) {
    throw new Error('microInteractionsAndAnimation must be an object');
  }

  const microInteractions = microInteractionsAndAnimation as Record<string, unknown>;
  const requiredFields = ['useScrollAnimation', 'scrollAnimationType', 'hoverEffect'];
  
  for (const field of requiredFields) {
    if (microInteractions[field] === undefined) {
      throw new Error(`microInteractionsAndAnimation.${field} is required`);
    }
  }

  if (typeof microInteractions.useScrollAnimation !== 'boolean') {
    throw new Error('microInteractionsAndAnimation.useScrollAnimation must be a boolean');
  }
  if (!microInteractions.scrollAnimationType) {
    throw new Error('microInteractionsAndAnimation.scrollAnimationType is required');
  }

  const hoverEffect = microInteractions.hoverEffect as Record<string, unknown>;
  if (!hoverEffect.target || !Array.isArray(hoverEffect.target)) {
    throw new Error('microInteractionsAndAnimation.hoverEffect.target must be an array');
  }
  if (!hoverEffect.type) {
    throw new Error('microInteractionsAndAnimation.hoverEffect.type is required');
  }
}