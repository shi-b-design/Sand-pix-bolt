import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSwipeStore } from "../store/useSwipeStore";
import { inferUserPreferences } from "../utils/preferenceInference";
import { callGeminiAPI, extractCodeFromMarkdown } from "../utils/geminiApi";
import { generateLandingPagePrompt } from "../utils/prompts";
import toast from "react-hot-toast";

export default function BrandInfoForm() {
  const [brandName, setBrandName] = useState("");
  const [brandTagline, setBrandTagline] = useState("");
  const {
    swipeResults,
    setBrandInfo,
    setUserPreferenceJSON,
    setHeroSectionCode,
    setCurrentPhase,
    isGeneratingHero,
    setIsGeneratingHero,
    setInferenceDetails,
  } = useSwipeStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!brandName.trim() || !brandTagline.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setBrandInfo(brandName, brandTagline);
    setIsGeneratingHero(true);

    try {
      // Step 1: Analyze user preferences with AI
      toast.loading("Analyzing your preferences...", { id: "analyzing" });

      const inferenceResult = await inferUserPreferences(swipeResults);
      setUserPreferenceJSON(inferenceResult.preferences);

      // Store inference details for debugging
      if (inferenceResult.rawResponse) {
        setInferenceDetails(inferenceResult.rawResponse);
        console.log("AI Inference used:", inferenceResult.usedAI);
      }

      toast.dismiss("analyzing");
      toast.loading("Generating your landing page...", { id: "generating" });

      // Step 2: Generate hero section
      const heroPrompt = generateLandingPagePrompt(
        inferenceResult.preferences,
        brandName,
        brandTagline,
        "hero-only"
      );

      const response = await callGeminiAPI(heroPrompt);
      const heroCode = extractCodeFromMarkdown(response);

      setHeroSectionCode(heroCode);
      setCurrentPhase("heroPreview");

      toast.dismiss("generating");
      toast.success("Hero section generated successfully!");
    } catch (error) {
      console.error("Error generating hero:", error);
      toast.dismiss("analyzing");
      toast.dismiss("generating");

      if (error instanceof Error) {
        if (error.message.includes("API rate limit")) {
          toast.error(
            "API rate limit reached. Please wait a moment and try again."
          );
        } else if (error.message.includes("API key")) {
          toast.error("API configuration error. Please check your settings.");
        } else {
          toast.error(`Generation failed: ${error.message}`);
        }
      } else {
        toast.error("Failed to generate hero section. Please try again.");
      }
    } finally {
      setIsGeneratingHero(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Tell us about your brand
          </h2>
          <p className="text-gray-600">
            We'll use this information to create your personalized landing page
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="brandName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Brand Name *
            </label>
            <input
              type="text"
              id="brandName"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Acme Inc"
              disabled={isGeneratingHero}
            />
          </div>

          <div>
            <label
              htmlFor="brandTagline"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Brand Tagline *
            </label>
            <input
              type="text"
              id="brandTagline"
              value={brandTagline}
              onChange={(e) => setBrandTagline(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="e.g., Innovation at its finest"
              disabled={isGeneratingHero}
            />
          </div>

          <button
            type="submit"
            disabled={isGeneratingHero}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGeneratingHero ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Hero Section...
              </>
            ) : (
              "Generate My Landing Page"
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          This may take 10-30 seconds depending on API response time
        </p>
      </div>
    </div>
  );
}
