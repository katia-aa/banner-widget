/** @jsx h */
import { h, render } from "preact";
import { Banner } from "./Banner";
import css from "./styles/output.css";

enum Variant {
  COOKIE = "COOKIE",
  ANNOUNCEMENT = "ANNOUNCEMENT",
  DEFAULT = "DEFAULT",
}

interface AppProps {
  text: string;
  speed: number;
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  variant: Variant;
}

const App = ({
  text,
  speed,
  backgroundColor,
  textColor,
  fontSize,
  fontWeight,
  variant = "DEFAULT" as Variant,
}: AppProps) => {
  return (
    <Banner
      text={text}
      speed={speed}
      backgroundColor={backgroundColor}
      textColor={textColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {variant === "COOKIE" ? (
        <div>COOKIE</div>
      ) : variant === "ANNOUNCEMENT" ? (
        <div>ANNOUNCEMENT</div>
      ) : null}
      {/* Add any children here if needed */}
    </Banner>
  );
};

// Dynamically create the banner container and inject it at the top of the page
const rootElement = document.getElementById("banner");
if (!rootElement) {
  console.error("Root element not found");
  throw new Error("Root element not found");
}

// Create a new container for the banner and add it to the top of the body
const bannerContainer = document.createElement("div");
document.body.prepend(bannerContainer); // Add the container to the top of the body

const shadowRoot = bannerContainer.attachShadow({ mode: "open" }); // Use Shadow DOM

// Create a style element and add the CSS
const styleElement = document.createElement("style");
styleElement.textContent = css.toString();
shadowRoot.appendChild(styleElement);

// Function to extract data-* attributes from the root element
const getBannerAttributes = (rootElement: HTMLElement) => {
  return {
    text: rootElement.getAttribute("data-text") || "Default Banner Text",
    speed: parseInt(rootElement.getAttribute("data-speed") || "10"),
    backgroundColor: rootElement.getAttribute("data-background-color") || "blue",
    textColor: rootElement.getAttribute("data-text-color") || "white",
    fontSize: rootElement.getAttribute("data-font-size") || "16px",
    fontWeight: rootElement.getAttribute("data-font-weight") || "bold",
    variant: rootElement.getAttribute("data-variant") || "DEFAULT",
  };
};

// Extract data-* attributes from the root element
const {
  text,
  speed,
  backgroundColor,
  textColor,
  fontSize,
  fontWeight,
  variant,
} = getBannerAttributes(rootElement);

// Render the Banner component in the shadow DOM
render(
  <App
    text={text}
    speed={speed}
    backgroundColor={backgroundColor}
    textColor={textColor}
    fontSize={fontSize}
    fontWeight={fontWeight}
    variant={variant as Variant}
  />,
  shadowRoot
);
