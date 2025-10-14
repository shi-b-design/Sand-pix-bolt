import { useState } from 'react';
import { Monitor, Tablet, Smartphone, MessageSquare, Sparkles, Loader2 } from 'lucide-react';
import { useSwipeStore } from '../store/useSwipeStore';
import { callGeminiAPI, extractCodeFromMarkdown } from '../utils/geminiApi';
import { generateLandingPagePrompt } from '../utils/prompts';
import toast from 'react-hot-toast';

type ViewportSize = 'mobile' | 'tablet' | 'desktop';

export default function HeroPreview() {
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const {
    heroSectionCode,
    brandName,
    brandTagline,
    userPreferenceJSON,
    setFullPageCode,
    setCurrentPhase,
    isGeneratingFullPage,
    setIsGeneratingFullPage
  } = useSwipeStore();

  const viewportSizes = {
    mobile: '375px',
    tablet: '768px',
    desktop: '100%'
  };

  const handleGenerateFullPage = async () => {
    if (!userPreferenceJSON) return;

    setIsGeneratingFullPage(true);

    try {
      const fullPagePrompt = generateLandingPagePrompt(
        userPreferenceJSON,
        brandName,
        brandTagline,
        'full-page'
      );

      const response = await callGeminiAPI(fullPagePrompt);
      const fullPageCode = extractCodeFromMarkdown(response);

      setFullPageCode(fullPageCode);
      setCurrentPhase('fullPagePreview');
      toast.success('Full page generated successfully!');
    } catch (error) {
      console.error('Error generating full page:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to generate full page. Please try again.');
      }
    } finally {
      setIsGeneratingFullPage(false);
    }
  };

  const handleRefineDesign = () => {
    setCurrentPhase('chat');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Hero Section Preview</h2>
            <p className="text-sm text-gray-400 mt-1">{brandName} - {brandTagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewport('mobile')}
                className={`p-2 rounded transition ${
                  viewport === 'mobile'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                title="Mobile view"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`p-2 rounded transition ${
                  viewport === 'tablet'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                title="Tablet view"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('desktop')}
                className={`p-2 rounded transition ${
                  viewport === 'desktop'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                title="Desktop view"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            width: viewportSizes[viewport],
            maxWidth: '100%',
            height: '80vh'
          }}
        >
          <iframe
            srcDoc={`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://cdn.tailwindcss.com"></script>
                <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
              </head>
              <body>
                ${heroSectionCode}
              </body>
              </html>
            `}
            className="w-full h-full"
            title="Hero Preview"
          />
        </div>
      </div>

      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
          <button
            onClick={handleRefineDesign}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition font-medium"
          >
            <MessageSquare className="w-5 h-5" />
            Refine Design
          </button>
          <button
            onClick={handleGenerateFullPage}
            disabled={isGeneratingFullPage}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingFullPage ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Full Page...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Full Page
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
