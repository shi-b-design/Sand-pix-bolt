import { BrandDesign } from '../types/preferences';

// Import images
import disneyImage from '../assets/images/disney.png';
import chanelImage from '../assets/images/chanel.png';
import amexImage from '../assets/images/amex.png';
import bmwImage from '../assets/images/bmw.png';
import nikeImage from '../assets/images/nike.png';
import teslaImage from '../assets/images/tesla.png';
import mcdonaldImage from '../assets/images/mcdonald.png';
import mercedesImage from '../assets/images/mercedes.png';
import cocaColaImage from '../assets/images/coca-cola.png';

export const brandDesigns: BrandDesign[] = [
  {
    name: "Nintendo",
    image: "/images/nintendo.png",
    aestheticAndMood: {
      primaryMoods: {
        luxury: 1,
        minimalist: 4,
        corporate: 5,
        playful: 9,
        techy: 7,
        earthy: 1,
        brutalist: 0
      },
      secondaryQualities: {
        modern: 7,
        classic: 3,
        nostalgic: 8,
        futuristic: 6,
        handmade: 2
      }
    },
    layoutAndStructure: {
      density: "compact",
      contentFlow: "grid",
      headerSchema: {
        style: "fixed",
        layout: "logoLeftNavRight",
        showAnnouncementBar: false,
        showSearchBar: true
      },
      footerSchema: {
        layout: "multiColumnWithLogo",
        elements: ["logo", "socialIcons", "linkColumns", "copyright"]
      }
    },
    colorPalette: {
      schemeType: "vibrant",
      primaryBackgroundColor: "#FFFFFF",
      primaryTextColor: "#484848",
      accentColor: "#E60012",
      secondaryAccentColor: "#F0F0F0"
    },
    typography: {
      heading: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        letterSpacing: "normal",
        textTransform: "none"
      },
      body: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        lineHeight: "normal"
      },
      overallScale: "standard"
    },
    componentStyling: {
      cornerRadius: "rounded",
      buttonStyle: {
        variant: "filled"
      },
      shadowStyle: "subtle",
      borderStyle: "thin"
    },
    imageryAndMedia: {
      imageFraming: "card",
      heroImageOverlay: {
        type: "none",
        intensity: 0
      },
      iconStyle: "filled"
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: true,
      scrollAnimationType: "fadeInUp",
      hoverEffect: {
        target: ["buttons", "navigationLinks"],
        type: "scale"
      }
    }
  },
  {
    name: "Disney",
    image: disneyImage,
    aestheticAndMood: {
      primaryMoods: {
        luxury: 3,
        minimalist: 2,
        corporate: 6,
        playful: 10,
        techy: 5,
        earthy: 1,
        brutalist: 0
      },
      secondaryQualities: {
        modern: 6,
        classic: 8,
        nostalgic: 9,
        futuristic: 4,
        handmade: 3
      }
    },
    layoutAndStructure: {
      density: "spacious",
      contentFlow: "singleColumn",
      headerSchema: {
        style: "sticky",
        layout: "threeColumnLogoCenter",
        showAnnouncementBar: true,
        showSearchBar: true
      },
      footerSchema: {
        layout: "multiColumnWithLogo",
        elements: ["logo", "socialIcons", "linkColumns", "newsletterSignup", "copyright"]
      }
    },
    colorPalette: {
      schemeType: "vibrant",
      primaryBackgroundColor: "#FFFFFF",
      primaryTextColor: "#1E1E1E",
      accentColor: "#0063E5",
      secondaryAccentColor: "#FFD700"
    },
    typography: {
      heading: {
        fontFamily: "display",
        fontWeight: "bold",
        letterSpacing: "wide",
        textTransform: "uppercase"
      },
      body: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        lineHeight: "relaxed"
      },
      overallScale: "large"
    },
    componentStyling: {
      cornerRadius: "pill",
      buttonStyle: {
        variant: "filled"
      },
      shadowStyle: "deep",
      borderStyle: "none"
    },
    imageryAndMedia: {
      imageFraming: "fullBleed",
      heroImageOverlay: {
        type: "darkGradient",
        intensity: 40
      },
      iconStyle: "filled"
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: true,
      scrollAnimationType: "zoomIn",
      hoverEffect: {
        target: ["buttons", "cards"],
        type: "lift"
      }
    }
  },
  {
    name: "Chanel",
    image: chanelImage,
    aestheticAndMood: {
      primaryMoods: {
        luxury: 10,
        minimalist: 9,
        corporate: 4,
        playful: 0,
        techy: 3,
        earthy: 2,
        brutalist: 1
      },
      secondaryQualities: {
        modern: 8,
        classic: 10,
        nostalgic: 3,
        futuristic: 2,
        handmade: 5
      }
    },
    layoutAndStructure: {
      density: "spacious",
      contentFlow: "singleColumn",
      headerSchema: {
        style: "static",
        layout: "threeColumnLogoCenter",
        showAnnouncementBar: false,
        showSearchBar: false
      },
      footerSchema: {
        layout: "simpleCopyright",
        elements: ["copyright"]
      }
    },
    colorPalette: {
      schemeType: "lightMonochrome",
      primaryBackgroundColor: "#FFFFFF",
      primaryTextColor: "#000000",
      accentColor: "#000000",
      secondaryAccentColor: "#F5F5F5"
    },
    typography: {
      heading: {
        fontFamily: "serif",
        fontWeight: "light",
        letterSpacing: "wide",
        textTransform: "uppercase"
      },
      body: {
        fontFamily: "serif",
        fontWeight: "light",
        lineHeight: "relaxed"
      },
      overallScale: "large"
    },
    componentStyling: {
      cornerRadius: "sharp",
      buttonStyle: {
        variant: "outlined"
      },
      shadowStyle: "none",
      borderStyle: "thin"
    },
    imageryAndMedia: {
      imageFraming: "contained",
      heroImageOverlay: {
        type: "none",
        intensity: 0
      },
      iconStyle: "lineArt"
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: false,
      scrollAnimationType: "none",
      hoverEffect: {
        target: ["buttons"],
        type: "colorChange"
      }
    }
  },
  {
    name: "American Express",
    image: amexImage,
    aestheticAndMood: {
      primaryMoods: {
        luxury: 8,
        minimalist: 6,
        corporate: 10,
        playful: 1,
        techy: 7,
        earthy: 0,
        brutalist: 2
      },
      secondaryQualities: {
        modern: 9,
        classic: 7,
        nostalgic: 2,
        futuristic: 6,
        handmade: 0
      }
    },
    layoutAndStructure: {
      density: "standard",
      contentFlow: "grid",
      headerSchema: {
        style: "fixed",
        layout: "logoLeftNavRight",
        showAnnouncementBar: false,
        showSearchBar: true
      },
      footerSchema: {
        layout: "multiColumnWithLogo",
        elements: ["logo", "linkColumns", "copyright"]
      }
    },
    colorPalette: {
      schemeType: "vibrant",
      primaryBackgroundColor: "#006FCF",
      primaryTextColor: "#FFFFFF",
      accentColor: "#FFFFFF",
      secondaryAccentColor: "#00175A"
    },
    typography: {
      heading: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        letterSpacing: "tight",
        textTransform: "none"
      },
      body: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        lineHeight: "normal"
      },
      overallScale: "standard"
    },
    componentStyling: {
      cornerRadius: "sharp",
      buttonStyle: {
        variant: "filled"
      },
      shadowStyle: "subtle",
      borderStyle: "none"
    },
    imageryAndMedia: {
      imageFraming: "card",
      heroImageOverlay: {
        type: "colorWash",
        intensity: 30
      },
      iconStyle: "filled"
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: true,
      scrollAnimationType: "slideInLeft",
      hoverEffect: {
        target: ["buttons", "cards"],
        type: "lift"
      }
    }
  },
  {
    name: "BMW",
    image: bmwImage,
    aestheticAndMood: {
      primaryMoods: {
        luxury: 9,
        minimalist: 8,
        corporate: 7,
        playful: 1,
        techy: 9,
        earthy: 0,
        brutalist: 3
      },
      secondaryQualities: {
        modern: 10,
        classic: 5,
        nostalgic: 2,
        futuristic: 9,
        handmade: 0
      }
    },
    layoutAndStructure: {
      density: "spacious",
      contentFlow: "asymmetrical",
      headerSchema: {
        style: "fixed",
        layout: "logoLeftNavRight",
        showAnnouncementBar: false,
        showSearchBar: false
      },
      footerSchema: {
        layout: "linksWithSocial",
        elements: ["linkColumns", "socialIcons", "copyright"]
      }
    },
    colorPalette: {
      schemeType: "dark",
      primaryBackgroundColor: "#000000",
      primaryTextColor: "#FFFFFF",
      accentColor: "#1C69D4",
      secondaryAccentColor: "#333333"
    },
    typography: {
      heading: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        letterSpacing: "tight",
        textTransform: "uppercase"
      },
      body: {
        fontFamily: "sans-serif",
        fontWeight: "light",
        lineHeight: "relaxed"
      },
      overallScale: "large"
    },
    componentStyling: {
      cornerRadius: "sharp",
      buttonStyle: {
        variant: "filled"
      },
      shadowStyle: "none",
      borderStyle: "none"
    },
    imageryAndMedia: {
      imageFraming: "fullBleed",
      heroImageOverlay: {
        type: "darkGradient",
        intensity: 60
      },
      iconStyle: "lineArt"
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: true,
      scrollAnimationType: "fadeInUp",
      hoverEffect: {
        target: ["buttons", "navigationLinks", "images"],
        type: "scale"
      }
    }
  },
  {
    name: "Nike",
    image: nikeImage,
    aestheticAndMood: {
      primaryMoods: {
        luxury: 5,
        minimalist: 7,
        corporate: 6,
        playful: 4,
        techy: 8,
        earthy: 2,
        brutalist: 6
      },
      secondaryQualities: {
        modern: 10,
        classic: 3,
        nostalgic: 4,
        futuristic: 8,
        handmade: 1
      }
    },
    layoutAndStructure: {
      density: "standard",
      contentFlow: "asymmetrical",
      headerSchema: {
        style: "sticky",
        layout: "logoLeftNavRight",
        showAnnouncementBar: true,
        showSearchBar: true
      },
      footerSchema: {
        layout: "multiColumnWithLogo",
        elements: ["logo", "linkColumns", "socialIcons", "copyright"]
      }
    },
    colorPalette: {
      schemeType: "lightMonochrome",
      primaryBackgroundColor: "#FFFFFF",
      primaryTextColor: "#111111",
      accentColor: "#111111",
      secondaryAccentColor: "#F5F5F5"
    },
    typography: {
      heading: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        letterSpacing: "tight",
        textTransform: "uppercase"
      },
      body: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        lineHeight: "normal"
      },
      overallScale: "standard"
    },
    componentStyling: {
      cornerRadius: "pill",
      buttonStyle: {
        variant: "filled"
      },
      shadowStyle: "none",
      borderStyle: "none"
    },
    imageryAndMedia: {
      imageFraming: "fullBleed",
      heroImageOverlay: {
        type: "none",
        intensity: 0
      },
      iconStyle: "filled"
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: true,
      scrollAnimationType: "zoomIn",
      hoverEffect: {
        target: ["buttons", "cards", "images"],
        type: "scale"
      }
    }
  },
  {
    name: "Tesla",
    image: teslaImage,
    aestheticAndMood: {
      primaryMoods: {
        luxury: 7,
        minimalist: 10,
        corporate: 5,
        playful: 0,
        techy: 10,
        earthy: 3,
        brutalist: 4
      },
      secondaryQualities: {
        modern: 10,
        classic: 1,
        nostalgic: 0,
        futuristic: 10,
        handmade: 0
      }
    },
    layoutAndStructure: {
      density: "spacious",
      contentFlow: "singleColumn",
      headerSchema: {
        style: "fixed",
        layout: "threeColumnLogoCenter",
        showAnnouncementBar: false,
        showSearchBar: false
      },
      footerSchema: {
        layout: "simpleCopyright",
        elements: ["linkColumns", "copyright"]
      }
    },
    colorPalette: {
      schemeType: "darkMonochrome",
      primaryBackgroundColor: "#000000",
      primaryTextColor: "#FFFFFF",
      accentColor: "#FFFFFF",
      secondaryAccentColor: "#171A20"
    },
    typography: {
      heading: {
        fontFamily: "sans-serif",
        fontWeight: "medium",
        letterSpacing: "tight",
        textTransform: "none"
      },
      body: {
        fontFamily: "sans-serif",
        fontWeight: "light",
        lineHeight: "relaxed"
      },
      overallScale: "large"
    },
    componentStyling: {
      cornerRadius: "sharp",
      buttonStyle: {
        variant: "outlined"
      },
      shadowStyle: "none",
      borderStyle: "thin"
    },
    imageryAndMedia: {
      imageFraming: "fullBleed",
      heroImageOverlay: {
        type: "none",
        intensity: 0
      },
      iconStyle: "lineArt"
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: false,
      scrollAnimationType: "none",
      hoverEffect: {
        target: ["buttons"],
        type: "colorChange"
      }
    }
  },
  {
    name: "McDonald's",
    image: mcdonaldImage,
    aestheticAndMood: {
      primaryMoods: {
        luxury: 1,
        minimalist: 3,
        corporate: 7,
        playful: 8,
        techy: 4,
        earthy: 2,
        brutalist: 0
      },
      secondaryQualities: {
        modern: 6,
        classic: 8,
        nostalgic: 7,
        futuristic: 3,
        handmade: 1
      }
    },
    layoutAndStructure: {
      density: "compact",
      contentFlow: "grid",
      headerSchema: {
        style: "fixed",
        layout: "logoLeftNavRight",
        showAnnouncementBar: true,
        showSearchBar: true
      },
      footerSchema: {
        layout: "multiColumnWithLogo",
        elements: ["logo", "linkColumns", "socialIcons", "copyright"]
      }
    },
    colorPalette: {
      schemeType: "vibrant",
      primaryBackgroundColor: "#FFFFFF",
      primaryTextColor: "#292929",
      accentColor: "#FFC72C",
      secondaryAccentColor: "#DA291C"
    },
    typography: {
      heading: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        letterSpacing: "normal",
        textTransform: "none"
      },
      body: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        lineHeight: "normal"
      },
      overallScale: "standard"
    },
    componentStyling: {
      cornerRadius: "rounded",
      buttonStyle: {
        variant: "filled"
      },
      shadowStyle: "subtle",
      borderStyle: "none"
    },
    imageryAndMedia: {
      imageFraming: "card",
      heroImageOverlay: {
        type: "none",
        intensity: 0
      },
      iconStyle: "filled"
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: true,
      scrollAnimationType: "fadeInUp",
      hoverEffect: {
        target: ["buttons", "cards"],
        type: "scale"
      }
    }
  },
  {
    name: "Mercedes",
    image: mercedesImage,
    aestheticAndMood: {
      primaryMoods: {
        luxury: 10,
        minimalist: 7,
        corporate: 8,
        playful: 0,
        techy: 8,
        earthy: 1,
        brutalist: 2
      },
      secondaryQualities: {
        modern: 9,
        classic: 8,
        nostalgic: 3,
        futuristic: 7,
        handmade: 1
      }
    },
    layoutAndStructure: {
      density: "spacious",
      contentFlow: "grid",
      headerSchema: {
        style: "sticky",
        layout: "logoLeftNavRight",
        showAnnouncementBar: false,
        showSearchBar: true
      },
      footerSchema: {
        layout: "multiColumnWithLogo",
        elements: ["logo", "linkColumns", "socialIcons", "copyright"]
      }
    },
    colorPalette: {
      schemeType: "dark",
      primaryBackgroundColor: "#1A1A1A",
      primaryTextColor: "#FFFFFF",
      accentColor: "#00ADEF",
      secondaryAccentColor: "#2C2C2C"
    },
    typography: {
      heading: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        letterSpacing: "wide",
        textTransform: "uppercase"
      },
      body: {
        fontFamily: "sans-serif",
        fontWeight: "light",
        lineHeight: "relaxed"
      },
      overallScale: "large"
    },
    componentStyling: {
      cornerRadius: "sharp",
      buttonStyle: {
        variant: "filled"
      },
      shadowStyle: "deep",
      borderStyle: "thin"
    },
    imageryAndMedia: {
      imageFraming: "fullBleed",
      heroImageOverlay: {
        type: "darkGradient",
        intensity: 50
      },
      iconStyle: "filled"
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: true,
      scrollAnimationType: "fadeInUp",
      hoverEffect: {
        target: ["buttons", "cards", "images"],
        type: "lift"
      }
    }
  },
  {
    name: "Coca-Cola",
    image: cocaColaImage,
    aestheticAndMood: {
      primaryMoods: {
        luxury: 2,
        minimalist: 4,
        corporate: 6,
        playful: 7,
        techy: 3,
        earthy: 3,
        brutalist: 0
      },
      secondaryQualities: {
        modern: 5,
        classic: 9,
        nostalgic: 10,
        futuristic: 2,
        handmade: 4
      }
    },
    layoutAndStructure: {
      density: "standard",
      contentFlow: "singleColumn",
      headerSchema: {
        style: "sticky",
        layout: "logoLeftNavRight",
        showAnnouncementBar: true,
        showSearchBar: false
      },
      footerSchema: {
        layout: "multiColumnWithLogo",
        elements: ["logo", "linkColumns", "socialIcons", "newsletterSignup", "copyright"]
      }
    },
    colorPalette: {
      schemeType: "vibrant",
      primaryBackgroundColor: "#F40009",
      primaryTextColor: "#FFFFFF",
      accentColor: "#FFFFFF",
      secondaryAccentColor: "#000000"
    },
    typography: {
      heading: {
        fontFamily: "display",
        fontWeight: "bold",
        letterSpacing: "normal",
        textTransform: "capitalize"
      },
      body: {
        fontFamily: "sans-serif",
        fontWeight: "normal",
        lineHeight: "normal"
      },
      overallScale: "large"
    },
    componentStyling: {
      cornerRadius: "pill",
      buttonStyle: {
        variant: "filled"
      },
      shadowStyle: "subtle",
      borderStyle: "none"
    },
    imageryAndMedia: {
      imageFraming: "card",
      heroImageOverlay: {
        type: "colorWash",
        intensity: 20
      },
      iconStyle: "filled"
    },
    microInteractionsAndAnimation: {
      useScrollAnimation: true,
      scrollAnimationType: "zoomIn",
      hoverEffect: {
        target: ["buttons", "cards"],
        type: "scale"
      }
    }
  }
];
