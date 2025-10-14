# Tinder-Style Landing Page Generator

A full-stack SaaS application that generates custom landing pages based on user aesthetic preferences collected through a Tinder-style swipe interface.

## Features

- **Swipe Interface**: Swipe through 10 brand landing page designs to express your preferences
- **AI-Powered Generation**: Uses Google Gemini AI to generate personalized landing pages
- **Hero Section Preview**: See a preview of your hero section before generating the full page
- **Chat Refinement**: Refine your design through natural language instructions
- **Full Page Generation**: Generate complete, responsive landing pages with all sections
- **Export Options**: Download HTML or copy code to clipboard

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)

## Usage

### 1. Swipe Phase
- Swipe right (or click the heart button) on designs you like
- Swipe left (or click the X button) on designs you don't like
- Complete all 10 swipes

### 2. Brand Information
- Enter your brand name
- Enter your brand tagline
- Click "Generate My Landing Page"

### 3. Hero Preview
- View the AI-generated hero section
- Toggle between mobile, tablet, and desktop views
- Choose to either:
  - **Generate Full Page**: Create the complete landing page
  - **Refine Design**: Make changes through chat

### 4. Chat Refinement (Optional)
- Type natural language instructions like:
  - "Make it more minimal"
  - "Use darker colors"
  - "Add gradient background"
  - "Make it more playful"
- Use suggested prompts for quick changes
- Preview updates in real-time
- Generate full page when satisfied

### 5. Full Page Preview
- View your complete landing page
- Download as HTML file
- Copy code to clipboard
- Return to refinement if needed

## Project Structure

```
src/
├── components/
│   ├── SwipeCard.tsx          # Individual swipe card component
│   ├── SwipeInterface.tsx     # Main swipe interface
│   ├── ProgressBar.tsx        # Swipe progress indicator
│   ├── BrandInfoForm.tsx      # Brand information form
│   ├── HeroPreview.tsx        # Hero section preview with viewport toggles
│   ├── ChatInterface.tsx      # Chat-based design refinement
│   └── FullPagePreview.tsx    # Full page preview with export
├── store/
│   └── useSwipeStore.ts       # Zustand state management
├── types/
│   └── preferences.ts         # TypeScript type definitions
├── utils/
│   ├── brandData.ts           # 10 brand designs with metadata
│   ├── preferenceInference.ts # Algorithm to infer user preferences
│   ├── geminiApi.ts           # Gemini API integration
│   └── prompts.ts             # Unified prompt templates
├── App.tsx                    # Main app component
└── main.tsx                   # Entry point
```

## How It Works

### Preference Inference Algorithm

1. **Calculate Averages**: Computes average aesthetic mood scores from liked brands
2. **Frequency Analysis**: Identifies most common visual features (layout, colors, typography)
3. **Confidence Scoring**: Assigns confidence levels based on statistical variance
4. **AI Refinement**: Uses reasoning for low-confidence parameters
5. **Generate JSON**: Creates comprehensive user preference profile

### Prompt System

The application uses a **unified prompt template** for both hero section and full page generation:
- **Same prompt structure** for consistency
- **Different scope parameter**: `'hero-only'` or `'full-page'`
- Includes all design specifications from user preferences
- Ensures visual consistency across generations

### Design Specifications

Each generated page follows the inferred preferences for:
- Color palette and scheme
- Typography (fonts, weights, spacing)
- Layout density and structure
- Component styling (borders, shadows, corners)
- Animations and interactions
- Overall aesthetic mood

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Environment Variables

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## Brand Data

The application includes design metadata for 10 brands:
1. Nintendo - Playful, vibrant gaming brand
2. Disney - Magical, nostalgic entertainment
3. Chanel - Luxury, minimalist fashion
4. American Express - Corporate, professional finance
5. BMW - Luxury, tech-forward automotive
6. Nike - Modern, athletic sportswear
7. Tesla - Minimalist, futuristic automotive
8. McDonald's - Playful, nostalgic fast food
9. Mercedes - Luxury, premium automotive
10. Coca-Cola - Classic, nostalgic beverage

Each brand includes comprehensive design data:
- Aesthetic moods (luxury, minimalist, playful, etc.)
- Layout structure and density
- Color palette and typography
- Component styling preferences
- Animation and interaction patterns

## API Integration

### Gemini API

The app uses Google's Gemini 1.5 Flash model for:
- Hero section generation
- Full page generation
- Design refinements

**Rate Limits**: Be aware of Google's API rate limits. If you encounter errors, wait a few moments before trying again.

## Error Handling

The application includes comprehensive error handling:
- Network errors
- API rate limits
- Invalid API keys
- Malformed responses
- User-friendly toast notifications

## Tips for Best Results

1. **Be Honest with Swipes**: Your genuine preferences lead to better results
2. **Clear Instructions**: When refining, be specific about what you want to change
3. **Iterate**: Don't hesitate to refine multiple times to get the perfect design
4. **Try Different Brands**: Swipe on a variety of brands to give the AI more data
5. **Save Your Work**: Download the HTML as soon as you're satisfied

## Troubleshooting

### "Invalid API key" error
- Check that you've added your Gemini API key to `.env`
- Ensure the key starts with `AI...`
- Restart the dev server after adding the key

### "API rate limit reached" error
- Wait 30-60 seconds before trying again
- Consider upgrading your Gemini API plan

### Swipe cards not moving
- Ensure JavaScript is enabled
- Try refreshing the page
- Check browser console for errors

## Contributing

This is a demonstration project. Feel free to fork and customize for your needs.

## License

MIT

## Acknowledgments

- Brand images from Pexels
- Icons from Lucide React
- AI powered by Google Gemini
