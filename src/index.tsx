/** @jsx h */
import { h, render } from "preact";
import Banner from "./Banner";
import css from "./styles/output.css";

interface AppProps {
  text: string;
  speed: number;
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
}

const App = ({
  text,
  speed,
  backgroundColor,
  textColor,
  fontSize,
  fontWeight,
}: AppProps) => {
  return (
    <Banner
      text={text}
      speed={speed}
      backgroundColor={backgroundColor}
      textColor={textColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
    />
  );
};

// Dynamically create the banner container and inject it at the top of the page
const rootElement = document.getElementById("EDIT: ROOT_ID");
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
styleElement.textContent = css;
shadowRoot.appendChild(styleElement);

// Extract data-* attributes from the root element
const text = rootElement.getAttribute("data-text") || "Default Banner Text";
const speed = parseInt(rootElement.getAttribute("data-speed"), 10) || 20;
const backgroundColor =
  rootElement.getAttribute("data-background-color") || "blue";
const textColor = rootElement.getAttribute("data-text-color") || "white";
const fontSize = rootElement.getAttribute("data-font-size") || "16px";
const fontWeight = rootElement.getAttribute("data-font-weight") || "bold";

// Render the Banner component in the shadow DOM
render(
  <App
    text={text}
    speed={speed}
    backgroundColor={backgroundColor}
    textColor={textColor}
    fontSize={fontSize}
    fontWeight={fontWeight}
  />,
  shadowRoot
);
