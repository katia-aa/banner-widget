/** @jsx h */
import { h, render } from "preact";
import { BannerWrapper, Variant } from "./Banner";
import css from "./styles/output.css";
import { getBannerAttributes } from "./utils/getBannerAttributes";
import { createBannerContainer } from "./utils/createBannerContainer";

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
  buttonText,
  link,
  linkText,
  cookiePolicyLink,
} = getBannerAttributes(rootElement);

// Render the Banner component in the shadow DOM
render(
  <BannerWrapper
    text={text}
    speed={speed}
    backgroundColor={backgroundColor}
    textColor={textColor}
    fontSize={fontSize}
    fontWeight={fontWeight}
    variant={variant as Variant}
    buttonText={buttonText}
    link={link}
    linkText={linkText}
    cookiePolicyLink={cookiePolicyLink}
  />,
  shadowRoot
);
