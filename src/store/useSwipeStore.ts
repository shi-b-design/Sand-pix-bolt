import { create } from 'zustand';
import { SwipeResult, UserPreferenceJSON, ChatMessage } from '../types/preferences';

interface SwipeStore {
  currentIndex: number;
  swipeResults: SwipeResult[];
  addSwipeResult: (result: SwipeResult) => void;
  nextCard: () => void;

  brandName: string;
  brandTagline: string;
  setBrandInfo: (name: string, tagline: string) => void;

  userPreferenceJSON: UserPreferenceJSON | null;
  setUserPreferenceJSON: (json: UserPreferenceJSON) => void;

  heroSectionCode: string | null;
  fullPageCode: string | null;
  setHeroSectionCode: (code: string) => void;
  setFullPageCode: (code: string) => void;

  chatMessages: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChat: () => void;

  currentPhase: 'swipe' | 'brandInfo' | 'heroPreview' | 'chat' | 'fullPagePreview';
  setCurrentPhase: (phase: 'swipe' | 'brandInfo' | 'heroPreview' | 'chat' | 'fullPagePreview') => void;

  isGeneratingHero: boolean;
  isGeneratingFullPage: boolean;
  isRefining: boolean;
  setIsGeneratingHero: (loading: boolean) => void;
  setIsGeneratingFullPage: (loading: boolean) => void;
  setIsRefining: (loading: boolean) => void;

  inferenceDetails: string | null;
  setInferenceDetails: (details: string | null) => void;

  reset: () => void;
}

export const useSwipeStore = create<SwipeStore>((set) => ({
  currentIndex: 0,
  swipeResults: [],
  addSwipeResult: (result) =>
    set((state) => ({
      swipeResults: [...state.swipeResults, result],
    })),
  nextCard: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),

  brandName: '',
  brandTagline: '',
  setBrandInfo: (name, tagline) =>
    set({ brandName: name, brandTagline: tagline }),

  userPreferenceJSON: null,
  setUserPreferenceJSON: (json) =>
    set({ userPreferenceJSON: json }),

  heroSectionCode: null,
  fullPageCode: null,
  setHeroSectionCode: (code) =>
    set({ heroSectionCode: code }),
  setFullPageCode: (code) =>
    set({ fullPageCode: code }),

  chatMessages: [],
  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message],
    })),
  clearChat: () =>
    set({ chatMessages: [] }),

  currentPhase: 'swipe',
  setCurrentPhase: (phase) =>
    set({ currentPhase: phase }),

  isGeneratingHero: false,
  isGeneratingFullPage: false,
  isRefining: false,
  setIsGeneratingHero: (loading) =>
    set({ isGeneratingHero: loading }),
  setIsGeneratingFullPage: (loading) =>
    set({ isGeneratingFullPage: loading }),
  setIsRefining: (loading) =>
    set({ isRefining: loading }),

  inferenceDetails: null,
  setInferenceDetails: (details) =>
    set({ inferenceDetails: details }),

  reset: () =>
    set({
      currentIndex: 0,
      swipeResults: [],
      brandName: '',
      brandTagline: '',
      userPreferenceJSON: null,
      heroSectionCode: null,
      fullPageCode: null,
      chatMessages: [],
      currentPhase: 'swipe',
      isGeneratingHero: false,
      isGeneratingFullPage: false,
      isRefining: false,
      inferenceDetails: null,
    }),
}));
