// Function to extract data-* attributes from the root element
export const getBannerAttributes = (rootElement: HTMLElement) => {
  return {
    text: rootElement.getAttribute("data-text") || "Default Banner Text",
    speed: parseInt(rootElement.getAttribute("data-speed") || "10"),
    backgroundColor:
      rootElement.getAttribute("data-background-color") || "blue",
    textColor: rootElement.getAttribute("data-text-color") || "white",
    fontSize: rootElement.getAttribute("data-font-size") || "16px",
    fontWeight: rootElement.getAttribute("data-font-weight") || "bold",
    variant: rootElement.getAttribute("data-variant") || "DEFAULT",
  };
};
