/** @jsx h */
import { h, render, Fragment } from "preact";
import { Banner } from "./Banner";
import css from "./styles/output.css";
import { getBannerAttributes } from "./utils/getBannerAttributes";
import { createBannerContainer } from "./utils/createBannerContainer";

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
        <Fragment>COOKIE</Fragment>
      ) : variant === "ANNOUNCEMENT" ? (
        <Fragment>ANNOUNCEMENT</Fragment>
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

const shadowRoot = createBannerContainer(css.toString());

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
