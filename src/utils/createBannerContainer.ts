export const createBannerContainer = (css: string): ShadowRoot => {
  if (!css.trim()) {
    throw new Error("CSS string cannot be empty");
  }

  try {
    // Create a new container for the banner
    const bannerContainer = document.createElement("div");

    // Attach Shadow DOM to the container
    const shadowRoot = bannerContainer.attachShadow({ mode: "open" });

    // Create a style element and add the CSS
    const styleElement = document.createElement("style");
    styleElement.textContent = css;

    // Append the style element to the Shadow DOM
    shadowRoot.appendChild(styleElement);

    // Add the container to the top of the body
    document.body.prepend(bannerContainer);

    return shadowRoot;
  } catch (error) {
    console.error("Failed to create banner container:", error);
    throw error;
  }
};
