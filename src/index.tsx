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

const rootElement = document.getElementById("EDIT: ROOT_ID");
if (!rootElement) {
  console.error("Root element not found");
  throw new Error("Root element not found");
}
const styleElement = document.createElement("style");
styleElement.textContent = css;
const shadowRoot = rootElement.attachShadow({ mode: "open" });
shadowRoot.appendChild(styleElement);
const text = rootElement.getAttribute("data-text") || "Default Banner Text";
const speed = rootElement.getAttribute("data-speed") || "10s";
const backgroundColor =
  rootElement.getAttribute("data-background-color") || "bg-blue-500";
const textColor = rootElement.getAttribute("data-text-color") || "text-white";
const fontSize = rootElement.getAttribute("data-font-size") || "text-lg";
const fontWeight =
  rootElement.getAttribute("data-font-weight") || "font-normal";

console.log("hi");

// Render the Banner component
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
