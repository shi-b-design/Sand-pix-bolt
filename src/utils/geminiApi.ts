const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

export async function callGeminiAPI(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 30000,
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    if (response.status === 429) {
      throw new Error('API rate limit reached. Please wait and try again.');
    } else if (response.status === 401) {
      throw new Error('Invalid API key. Check your .env file.');
    }
    throw new Error(`API error: ${error}`);
  }

  const data = await response.json();

  // Debug: Log response structure
  console.log('Gemini API Response (callGeminiAPI):', JSON.stringify(data, null, 2).substring(0, 500));

  // Validate response structure
  if (!data.candidates) {
    console.error('API response missing candidates:', data);
    throw new Error('API response is missing candidates array. The content may have been blocked or filtered.');
  }

  if (!data.candidates[0]) {
    console.error('API response candidates array is empty:', data);
    throw new Error('API response candidates array is empty. The request may have been rejected.');
  }

  if (!data.candidates[0].content) {
    console.error('API response missing content:', data.candidates[0]);
    throw new Error('API response is missing content. Response may have been blocked.');
  }

  if (!data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
    console.error('API response missing parts:', data.candidates[0].content);
    throw new Error('API response is missing content parts.');
  }

  if (!data.candidates[0].content.parts[0].text) {
    console.error('API response missing text:', data.candidates[0].content.parts[0]);
    throw new Error('API response is missing text content.');
  }

  return data.candidates[0].content.parts[0].text;
}

export async function callGeminiAPIForInference(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.2, // Lower temperature for more consistent analytical responses
        maxOutputTokens: 65536, // Increased for detailed inference output
        topP: 0.95,
        topK: 40,
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    if (response.status === 429) {
      throw new Error('API rate limit reached. Please wait and try again.');
    } else if (response.status === 401) {
      throw new Error('Invalid API key. Check your .env file.');
    }
    throw new Error(`API error: ${error}`);
  }

  const data = await response.json();

  // Debug: Log response structure
  console.log('Gemini API Response (callGeminiAPIForInference):', JSON.stringify(data, null, 2).substring(0, 500));

  // Validate response structure
  if (!data.candidates) {
    console.error('API response missing candidates:', data);
    throw new Error('API response is missing candidates array. The content may have been blocked or filtered.');
  }

  if (!data.candidates[0]) {
    console.error('API response candidates array is empty:', data);
    throw new Error('API response candidates array is empty. The request may have been rejected.');
  }

  if (!data.candidates[0].content) {
    console.error('API response missing content:', data.candidates[0]);
    throw new Error('API response is missing content. Response may have been blocked.');
  }

  if (!data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
    console.error('API response missing parts:', data.candidates[0].content);
    throw new Error('API response is missing content parts.');
  }

  if (!data.candidates[0].content.parts[0].text) {
    console.error('API response missing text:', data.candidates[0].content.parts[0]);
    throw new Error('API response is missing text content.');
  }

  return data.candidates[0].content.parts[0].text;
}

export function extractCodeFromMarkdown(response: string): string {
  const codeBlockRegex = /```html\n([\s\S]*?)```/;
  const match = response.match(codeBlockRegex);

  if (match && match[1]) {
    return match[1].trim();
  }

  const altRegex = /```\n([\s\S]*?)```/;
  const altMatch = response.match(altRegex);

  if (altMatch && altMatch[1]) {
    return altMatch[1].trim();
  }

  if (response.includes('<!DOCTYPE html>') || response.includes('<section')) {
    return response.trim();
  }

  return response;
}
