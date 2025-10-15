import { SwipeResult, UserPreferenceJSON } from '../types/preferences';
import { generateInferencePrompt } from './inferencePrompts';
import { parseInferenceResponse } from './inferenceParser';
import { callGeminiAPIForInference } from './geminiApi';

function calculateStandardDeviation(values: number[]): number {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / values.length;
  return Math.sqrt(variance);
}

function calculateConfidenceFromStdDev(stdDev: number): number {
  if (stdDev < 2) return 0.90;
  if (stdDev < 4) return 0.77;
  return 0.60;
}

function calculateFrequencyConfidence(frequency: number, total: number): number {
  const percentage = (frequency / total) * 100;
  if (percentage >= 85) return 0.95;
  if (percentage >= 70) return 0.82;
  if (percentage >= 55) return 0.70;
  return 0.50;
}

function mostFrequent<T>(items: T[]): { value: T; frequency: number; confidence: number } {
  const counts = new Map<T, number>();
  items.forEach(item => {
    counts.set(item, (counts.get(item) || 0) + 1);
  });

  let maxCount = 0;
  let mostFrequentValue = items[0];

  counts.forEach((count, value) => {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentValue = value;
    }
  });

  return {
    value: mostFrequentValue,
    frequency: maxCount,
    confidence: calculateFrequencyConfidence(maxCount, items.length)
  };
}

export function inferUserPreferencesSimple(swipeResults: SwipeResult[]): UserPreferenceJSON {
  const likedBrands = swipeResults.filter(result => result.liked);
  const likedDesigns = likedBrands.map(brand => brand.brandDesign);

  console.log('=== Preference Inference Started ===');
  console.log(`Total swipes: ${swipeResults.length}`);
  console.log(`Liked: ${likedBrands.length}, Disliked: ${swipeResults.length - likedBrands.length}`);

  const luxuryScores = likedDesigns.map(d => d.aestheticAndMood.primaryMoods.luxury);
  const minimalistScores = likedDesigns.map(d => d.aestheticAndMood.primaryMoods.minimalist);
  const corporateScores = likedDesigns.map(d => d.aestheticAndMood.primaryMoods.corporate);
  const playfulScores = likedDesigns.map(d => d.aestheticAndMood.primaryMoods.playful);
  const techyScores = likedDesigns.map(d => d.aestheticAndMood.primaryMoods.techy);
  const earthyScores = likedDesigns.map(d => d.aestheticAndMood.primaryMoods.earthy);
  const brutalistScores = likedDesigns.map(d => d.aestheticAndMood.primaryMoods.brutalist);

  const avgLuxury = luxuryScores.reduce((sum, val) => sum + val, 0) / luxuryScores.length;
  const avgMinimalist = minimalistScores.reduce((sum, val) => sum + val, 0) / minimalistScores.length;
  const avgCorporate = corporateScores.reduce((sum, val) => sum + val, 0) / corporateScores.length;
  const avgPlayful = playfulScores.reduce((sum, val) => sum + val, 0) / playfulScores.length;
  const avgTechy = techyScores.reduce((sum, val) => sum + val, 0) / techyScores.length;
  const avgEarthy = earthyScores.reduce((sum, val) => sum + val, 0) / earthyScores.length;
  const avgBrutalist = brutalistScores.reduce((sum, val) => sum + val, 0) / brutalistScores.length;

  console.log('Aesthetic Mood Averages:');
  console.log(`  Luxury: ${avgLuxury.toFixed(2)} (stdDev: ${calculateStandardDeviation(luxuryScores).toFixed(2)})`);
  console.log(`  Minimalist: ${avgMinimalist.toFixed(2)} (stdDev: ${calculateStandardDeviation(minimalistScores).toFixed(2)})`);
  console.log(`  Corporate: ${avgCorporate.toFixed(2)} (stdDev: ${calculateStandardDeviation(corporateScores).toFixed(2)})`);
  console.log(`  Playful: ${avgPlayful.toFixed(2)} (stdDev: ${calculateStandardDeviation(playfulScores).toFixed(2)})`);
  console.log(`  Techy: ${avgTechy.toFixed(2)} (stdDev: ${calculateStandardDeviation(techyScores).toFixed(2)})`);

  const densityFreq = mostFrequent(likedDesigns.map(d => d.layoutAndStructure.density));
  const contentFlowFreq = mostFrequent(likedDesigns.map(d => d.layoutAndStructure.contentFlow));
  const headerStyleFreq = mostFrequent(likedDesigns.map(d => d.layoutAndStructure.headerSchema.style));
  const headerLayoutFreq = mostFrequent(likedDesigns.map(d => d.layoutAndStructure.headerSchema.layout));
  const footerLayoutFreq = mostFrequent(likedDesigns.map(d => d.layoutAndStructure.footerSchema.layout));
  const schemeTypeFreq = mostFrequent(likedDesigns.map(d => d.colorPalette.schemeType));
  const cornerRadiusFreq = mostFrequent(likedDesigns.map(d => d.componentStyling.cornerRadius));
  const buttonVariantFreq = mostFrequent(likedDesigns.map(d => d.componentStyling.buttonStyle.variant));

  console.log('\nFrequency Analysis:');
  console.log(`  Density: ${densityFreq.value} (${densityFreq.frequency}/${likedBrands.length} = ${((densityFreq.frequency/likedBrands.length)*100).toFixed(0)}%)`);
  console.log(`  Content Flow: ${contentFlowFreq.value} (${contentFlowFreq.frequency}/${likedBrands.length} = ${((contentFlowFreq.frequency/likedBrands.length)*100).toFixed(0)}%)`);
  console.log(`  Color Scheme: ${schemeTypeFreq.value} (${schemeTypeFreq.frequency}/${likedBrands.length} = ${((schemeTypeFreq.frequency/likedBrands.length)*100).toFixed(0)}%)`);

  const showAnnouncementBarCount = likedDesigns.filter(d => d.layoutAndStructure.headerSchema.showAnnouncementBar).length;
  const showSearchBarCount = likedDesigns.filter(d => d.layoutAndStructure.headerSchema.showSearchBar).length;

  let primaryBgColor = '#FFFFFF';
  let primaryTextColor = '#000000';
  let accentColor = '#3B82F6';

  if (schemeTypeFreq.value.includes('dark')) {
    primaryBgColor = '#000000';
    primaryTextColor = '#FFFFFF';
  } else if (schemeTypeFreq.value === 'vibrant') {
    const vibrantColors = likedDesigns.filter(d => d.colorPalette.schemeType === 'vibrant').map(d => d.colorPalette.accentColor);
    if (vibrantColors.length > 0) {
      accentColor = vibrantColors[0];
    }
  }

  const headingFontFamilyFreq = mostFrequent(likedDesigns.map(d => d.typography.heading.fontFamily));
  const headingFontWeightFreq = mostFrequent(likedDesigns.map(d => d.typography.heading.fontWeight));
  const bodyFontFamilyFreq = mostFrequent(likedDesigns.map(d => d.typography.body.fontFamily));

  // const allFooterElements = likedDesigns.flatMap(d => d.layoutAndStructure.footerSchema.elements);
  // const footerElementFreq = mostFrequent(allFooterElements); // Unused for now

  const aiRefined: string[] = [];
  const overallConfidence = (
    calculateConfidenceFromStdDev(calculateStandardDeviation(luxuryScores)) +
    calculateConfidenceFromStdDev(calculateStandardDeviation(minimalistScores)) +
    densityFreq.confidence +
    contentFlowFreq.confidence
  ) / 4;

  const userPreference: UserPreferenceJSON = {
    metadata: {
      profileId: `profile_${Date.now()}`,
      userId: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      schemaVersion: "2.0",
      inference: {
        method: "hybrid",
        confidence: Math.round(overallConfidence * 100) / 100,
        totalSwipes: 10,
        likedCount: likedBrands.length,
        dislikedCount: swipeResults.length - likedBrands.length,
        aiRefined
      }
    },
    aestheticAndMood: {
      primaryMoods: {
        luxury: { value: Math.round(avgLuxury * 10) / 10, confidence: calculateConfidenceFromStdDev(calculateStandardDeviation(luxuryScores)) },
        minimalist: { value: Math.round(avgMinimalist * 10) / 10, confidence: calculateConfidenceFromStdDev(calculateStandardDeviation(minimalistScores)) },
        corporate: { value: Math.round(avgCorporate * 10) / 10, confidence: calculateConfidenceFromStdDev(calculateStandardDeviation(corporateScores)) },
        playful: { value: Math.round(avgPlayful * 10) / 10, confidence: calculateConfidenceFromStdDev(calculateStandardDeviation(playfulScores)) },
        techy: { value: Math.round(avgTechy * 10) / 10, confidence: calculateConfidenceFromStdDev(calculateStandardDeviation(techyScores)) },
        earthy: { value: Math.round(avgEarthy * 10) / 10, confidence: calculateConfidenceFromStdDev(calculateStandardDeviation(earthyScores)) },
        brutalist: { value: Math.round(avgBrutalist * 10) / 10, confidence: calculateConfidenceFromStdDev(calculateStandardDeviation(brutalistScores)) }
      },
      secondaryQualities: {
        modern: Math.round((likedDesigns.map(d => d.aestheticAndMood.secondaryQualities.modern).reduce((sum, val) => sum + val, 0) / likedDesigns.length) * 10) / 10,
        classic: Math.round((likedDesigns.map(d => d.aestheticAndMood.secondaryQualities.classic).reduce((sum, val) => sum + val, 0) / likedDesigns.length) * 10) / 10,
        nostalgic: Math.round((likedDesigns.map(d => d.aestheticAndMood.secondaryQualities.nostalgic).reduce((sum, val) => sum + val, 0) / likedDesigns.length) * 10) / 10,
        futuristic: Math.round((likedDesigns.map(d => d.aestheticAndMood.secondaryQualities.futuristic).reduce((sum, val) => sum + val, 0) / likedDesigns.length) * 10) / 10,
        handmade: Math.round((likedDesigns.map(d => d.aestheticAndMood.secondaryQualities.handmade).reduce((sum, val) => sum + val, 0) / likedDesigns.length) * 10) / 10
      }
    },
    layoutAndStructure: {
      density: densityFreq.value,
      contentFlow: contentFlowFreq.value,
      headerSchema: {
        style: headerStyleFreq.value,
        layout: headerLayoutFreq.value,
        showAnnouncementBar: showAnnouncementBarCount > likedBrands.length / 2,
        showSearchBar: showSearchBarCount > likedBrands.length / 2
      },
      footerSchema: {
        layout: footerLayoutFreq.value,
        elements: ['logo', 'linkColumns', 'socialIcons', 'copyright']
      }
    },
    colorPalette: {
      schemeType: schemeTypeFreq.value,
      primaryBackgroundColor: primaryBgColor,
      primaryTextColor: primaryTextColor,
      accentColor: accentColor,
      secondaryAccentColor: schemeTypeFreq.value.includes('dark') ? '#1F1F1F' : '#F3F4F6'
    },
    typography: {
      heading: {
        fontFamily: headingFontFamilyFreq.value,
        fontWeight: headingFontWeightFreq.value,
        letterSpacing: mostFrequent(likedDesigns.map(d => d.typography.heading.letterSpacing)).value,
        textTransform: mostFrequent(likedDesigns.map(d => d.typography.heading.textTransform)).value
      },
      body: {
        fontFamily: bodyFontFamilyFreq.value,
        fontWeight: mostFrequent(likedDesigns.map(d => d.typography.body.fontWeight)).value,
        lineHeight: mostFrequent(likedDesigns.map(d => d.typography.body.lineHeight)).value
      },
      overallScale: mostFrequent(likedDesigns.map(d => d.typography.overallScale)).value
    },
    componentStyling: {
      cornerRadius: cornerRadiusFreq.value,
      buttonStyle: {
        variant: buttonVariantFreq.value
      },
      shadowStyle: mostFrequent(likedDesigns.map(d => d.componentStyling.shadowStyle)).value,
      borderStyle: mostFrequent(likedDesigns.map(d => d.componentStyling.borderStyle)).value
    },
    imageryAndMedia: {
      imageFraming: mostFrequent(likedDesigns.map(d => d.imageryAndMedia.imageFraming)).value,
      heroImageOverlay: {
        type: mostFrequent(likedDesigns.map(d => d.imageryAndMedia.heroImageOverlay.type)).value,
        intensity: Math.round((likedDesigns.map(d => d.imageryAndMedia.heroImageOverlay.intensity).reduce((sum, val) => sum + val, 0) / likedDesigns.length))
      },
      iconStyle: mostFrequent(likedDesigns.map(d => d.imageryAndMedia.iconStyle)).value
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: likedDesigns.filter(d => d.microInteractionsAndAnimation.useScrollAnimation).length > likedBrands.length / 2,
      scrollAnimationType: mostFrequent(likedDesigns.map(d => d.microInteractionsAndAnimation.scrollAnimationType)).value,
      hoverEffect: {
        target: ['buttons', 'cards'],
        type: mostFrequent(likedDesigns.map(d => d.microInteractionsAndAnimation.hoverEffect.type)).value
      }
    }
  };

  console.log('\n=== Simple Preference Inference Complete ===');
  console.log(`Overall Confidence: ${userPreference.metadata.inference.confidence}`);

  return userPreference;
}

export async function inferUserPreferencesAI(swipeResults: SwipeResult[]): Promise<{ success: boolean; data?: UserPreferenceJSON; error?: string; rawResponse?: string }> {
  try {
    console.log('=== AI Preference Inference Started ===');
    console.log(`Total swipes: ${swipeResults.length}`);
    
    const prompt = generateInferencePrompt(swipeResults);
    console.log('Generated inference prompt, calling Gemini API...');
    
    const rawResponse = await callGeminiAPIForInference(prompt);
    console.log('Received AI response, parsing...');
    
    const parseResult = parseInferenceResponse(rawResponse);
    
    if (parseResult.success && parseResult.data) {
      console.log('=== AI Preference Inference Complete ===');
      console.log(`Overall Confidence: ${parseResult.data.metadata.inference.confidence}`);
      console.log(`AI Refined Parameters: ${parseResult.data.metadata.inference.aiRefined.join(', ')}`);
      
      return {
        success: true,
        data: parseResult.data,
        rawResponse: rawResponse
      };
    } else {
      console.error('AI inference parsing failed:', parseResult.error);
      return {
        success: false,
        error: parseResult.error || 'Failed to parse AI response',
        rawResponse: rawResponse
      };
    }
  } catch (error) {
    console.error('AI inference failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during AI inference'
    };
  }
}

export interface InferenceResult {
  preferences: UserPreferenceJSON;
  rawResponse?: string;
  usedAI: boolean;
}

export async function inferUserPreferences(swipeResults: SwipeResult[]): Promise<InferenceResult> {
  console.log('=== Starting Preference Inference ===');
  
  // Try AI inference first
  const aiResult = await inferUserPreferencesAI(swipeResults);
  
  if (aiResult.success && aiResult.data) {
    console.log('Using AI inference result');
    return {
      preferences: aiResult.data,
      rawResponse: aiResult.rawResponse,
      usedAI: true
    };
  }
  
  // Fallback to simple inference
  console.warn('AI inference failed, falling back to simple inference');
  console.warn('AI Error:', aiResult.error);
  
  const simpleResult = inferUserPreferencesSimple(swipeResults);
  console.log('Using simple inference result');
  
  return {
    preferences: simpleResult,
    rawResponse: undefined,
    usedAI: false
  };
}
