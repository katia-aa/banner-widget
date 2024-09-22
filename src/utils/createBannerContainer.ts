export const createBannerContainer = (css: string): ShadowRoot => {
  // Create a new container for the banner and add it to the top of the body
  const bannerContainer = document.createElement("div");
  document.body.prepend(bannerContainer); // Add the container to the top of the body

  const shadowRoot = bannerContainer.attachShadow({ mode: "open" }); // Use Shadow DOM

  // Create a style element and add the CSS
  const styleElement = document.createElement("style");
  styleElement.textContent = css.toString();
  shadowRoot.appendChild(styleElement);

  return shadowRoot;
};
