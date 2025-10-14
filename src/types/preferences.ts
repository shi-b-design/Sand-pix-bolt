export interface BrandDesign {
  name: string;
  image: string;
  aestheticAndMood: {
    primaryMoods: {
      luxury: number;
      minimalist: number;
      corporate: number;
      playful: number;
      techy: number;
      earthy: number;
      brutalist: number;
    };
    secondaryQualities: {
      modern: number;
      classic: number;
      nostalgic: number;
      futuristic: number;
      handmade: number;
    };
  };
  layoutAndStructure: {
    density: "spacious" | "standard" | "compact";
    contentFlow: "singleColumn" | "grid" | "asymmetrical";
    headerSchema: {
      style: "fixed" | "sticky" | "static";
      layout: "threeColumnLogoCenter" | "logoLeftNavRight" | "stackedCenter";
      showAnnouncementBar: boolean;
      showSearchBar: boolean;
    };
    footerSchema: {
      layout: "simpleCopyright" | "linksWithSocial" | "multiColumnWithLogo";
      elements: string[];
    };
  };
  colorPalette: {
    schemeType: "light" | "dark" | "lightMonochrome" | "darkMonochrome" | "vibrant" | "earthTones";
    primaryBackgroundColor: string;
    primaryTextColor: string;
    accentColor: string;
    secondaryAccentColor: string;
  };
  typography: {
    heading: {
      fontFamily: "serif" | "sans-serif" | "script" | "display";
      fontWeight: "light" | "normal" | "medium" | "bold";
      letterSpacing: "tight" | "normal" | "wide";
      textTransform: "none" | "uppercase" | "capitalize";
    };
    body: {
      fontFamily: "serif" | "sans-serif";
      fontWeight: "light" | "normal" | "medium" | "bold";
      lineHeight: "tight" | "normal" | "relaxed";
    };
    overallScale: "small" | "standard" | "large";
  };
  componentStyling: {
    cornerRadius: "sharp" | "rounded" | "pill";
    buttonStyle: {
      variant: "filled" | "outlined" | "textLink";
    };
    shadowStyle: "none" | "subtle" | "deep";
    borderStyle: "none" | "thin" | "thick";
  };
  imageryAndMedia: {
    imageFraming: "fullBleed" | "card" | "contained";
    heroImageOverlay: {
      type: "none" | "darkGradient" | "lightGradient" | "colorWash";
      intensity: number;
    };
    iconStyle: "lineArt" | "filled" | "duoTone";
  };
  microInteractionsAndAnimation: {
    useScrollAnimation: boolean;
    scrollAnimationType: "none" | "fadeInUp" | "slideInLeft" | "zoomIn";
    hoverEffect: {
      target: string[];
      type: "none" | "colorChange" | "scale" | "lift";
    };
  };
}

export interface UserPreferenceJSON {
  metadata: {
    profileId: string;
    userId: string;
    createdAt: string;
    schemaVersion: "2.0";
    inference: {
      method: "hybrid";
      confidence: number;
      totalSwipes: 10;
      likedCount: number;
      dislikedCount: number;
      aiRefined: string[];
    };
  };
  aestheticAndMood: {
    primaryMoods: {
      luxury: { value: number; confidence: number };
      minimalist: { value: number; confidence: number };
      corporate: { value: number; confidence: number };
      playful: { value: number; confidence: number };
      techy: { value: number; confidence: number };
      earthy: { value: number; confidence: number };
      brutalist: { value: number; confidence: number };
    };
    secondaryQualities: {
      modern: number;
      classic: number;
      nostalgic: number;
      futuristic: number;
      handmade: number;
    };
  };
  layoutAndStructure: {
    density: string;
    contentFlow: string;
    headerSchema: {
      style: string;
      layout: string;
      showAnnouncementBar: boolean;
      showSearchBar: boolean;
    };
    footerSchema: {
      layout: string;
      elements: string[];
    };
  };
  colorPalette: {
    schemeType: string;
    primaryBackgroundColor: string;
    primaryTextColor: string;
    accentColor: string;
    secondaryAccentColor: string;
  };
  typography: {
    heading: {
      fontFamily: string;
      fontWeight: string;
      letterSpacing: string;
      textTransform: string;
    };
    body: {
      fontFamily: string;
      fontWeight: string;
      lineHeight: string;
    };
    overallScale: string;
  };
  componentStyling: {
    cornerRadius: string;
    buttonStyle: {
      variant: string;
    };
    shadowStyle: string;
    borderStyle: string;
  };
  imageryAndMedia: {
    imageFraming: string;
    heroImageOverlay: {
      type: string;
      intensity: number;
    };
    iconStyle: string;
  };
  microInteractionsAndAnimation: {
    useScrollAnimation: boolean;
    scrollAnimationType: string;
    hoverEffect: {
      target: string[];
      type: string;
    };
  };
}

export interface SwipeResult {
  brandName: string;
  liked: boolean;
  brandDesign: BrandDesign;
  timestamp: Date;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
