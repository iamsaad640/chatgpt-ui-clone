import {
  ThemeConfig,
  extendTheme,
  defineStyleConfig,
  theme as chakraTheme,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const Button = defineStyleConfig({
  baseStyle: {
    cursor: "pointer",
  },
  variants: {
    custom: {
      bg: "bg.primary",
      color: "text.white",
      _hover: {
        bg: "bg.primary",
        opacity: 0.8,
      },
    },
  },
  defaultProps: {
    variant: "custom",
  },
});

// Extend Chakra's default colors
const colors = {
  ...chakraTheme.colors, // Preserve default colors
  bg: {
    gradient: "linear-gradient(180deg, #2A2E35 0%, #2D3E50 100%)",
    white: "#FFFFFF",
    primary: "#2D3E50",
    whiteAlpha: "rgba(255, 255, 255, 0.7)",
  },
  text: {
    light: "#2A2E35",
    white: "#FFFFFF",
  },
};

// Add font settings
const fonts = {
  heading: `'Inter', sans-serif`,
  body: `'Inter', sans-serif`,
};

export const theme = extendTheme({
  config,
  colors,
  fonts,
  components: {
    Button,
  },
  styles: {
    global: {
      "html, body": {
        bg: "bg.gradient",
        color: "white",
        fontFamily: "body",
      },
    },
  },
});
