import { useState, useRef, useEffect } from "react";
import { Send, X, Loader2, Sparkles } from "lucide-react";
import { useSwipeStore } from "../store/useSwipeStore";
import { callGeminiAPI, extractCodeFromMarkdown } from "../utils/geminiApi";
import {
  generateRefinementPrompt,
  generateLandingPagePrompt,
} from "../utils/prompts";
import toast from "react-hot-toast";

const SUGGESTED_PROMPTS = [
  "Make it more minimal",
  "Use darker colors",
  "Add gradient background",
  "Make it more playful",
  "Add more whitespace",
  "Larger text sizes",
];

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    chatMessages,
    addChatMessage,
    heroSectionCode,
    brandName,
    brandTagline,
    userPreferenceJSON,
    setHeroSectionCode,
    setCurrentPhase,
    setFullPageCode,
    isRefining,
    setIsRefining,
    isGeneratingFullPage,
    setIsGeneratingFullPage,
  } = useSwipeStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !heroSectionCode || !userPreferenceJSON) return;

    const userMessage = message.trim();
    addChatMessage({
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    });

    setInput("");
    setIsRefining(true);

    try {
      const refinementPrompt = generateRefinementPrompt(
        userPreferenceJSON,
        heroSectionCode,
        userMessage,
        brandName,
        brandTagline
      );

      const response = await callGeminiAPI(refinementPrompt);
      const updatedHeroCode = extractCodeFromMarkdown(response);

      setHeroSectionCode(updatedHeroCode);

      addChatMessage({
        role: "assistant",
        content: "Hero section updated successfully! Check the preview.",
        timestamp: new Date(),
      });

      toast.success("Design refined successfully!");
    } catch (error) {
      console.error("Error refining design:", error);
      addChatMessage({
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      });

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to refine design. Please try again.");
      }
    } finally {
      setIsRefining(false);
    }
  };

  const handleGenerateFullPage = async () => {
    if (!userPreferenceJSON) return;

    setIsGeneratingFullPage(true);

    try {
      const fullPagePrompt = generateLandingPagePrompt(
        userPreferenceJSON,
        brandName,
        brandTagline,
        "full-page"
      );

      const response = await callGeminiAPI(fullPagePrompt);
      const fullPageCode = extractCodeFromMarkdown(response);

      setFullPageCode(fullPageCode);
      setCurrentPhase("fullPagePreview");
      toast.success("Full page generated successfully!");
    } catch (error) {
      console.error("Error generating full page:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to generate full page. Please try again.");
      }
    } finally {
      setIsGeneratingFullPage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{
            width: "800px",
            maxWidth: "100%",
            height: "80vh",
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
                <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>
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

      <div className="w-96 bg-gray-800 flex flex-col border-l border-gray-700">
        <div className="bg-gray-700 px-4 py-3 flex items-center justify-between border-b border-gray-600">
          <div>
            <h3 className="font-semibold text-white">Design Assistant</h3>
            <p className="text-xs text-gray-400">Refine your hero section</p>
          </div>
          <button
            onClick={() => setCurrentPhase("heroPreview")}
            className="p-1 hover:bg-gray-600 rounded transition"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="mb-4">
                Tell me how you'd like to refine the design
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isRefining}
                    className="text-xs px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}

          {isRefining && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-700 space-y-3">
          <button
            onClick={handleGenerateFullPage}
            disabled={isGeneratingFullPage || isRefining}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingFullPage ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Full Page
              </>
            )}
          </button>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
              placeholder="Describe your changes..."
              disabled={isRefining}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50"
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={isRefining || !input.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageSquare({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  );
}
