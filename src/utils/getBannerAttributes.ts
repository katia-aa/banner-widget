const attributeConfig = {
  text: "Default Banner Text",
  speed: 10,
  backgroundColor: "#6941c6",
  textColor: "white",
  fontSize: "16px",
  fontWeight: "bold",
  variant: "DEFAULT",
  buttonText: "READ UPDATE",
  link: "https://example.com",
  linkText: "here",
  cookiePolicyLink: null,
};

export const getBannerAttributes = (rootElement: HTMLElement) => {
  return Object.fromEntries(
    Object.entries(attributeConfig).map(([key, defaultValue]) => {
      const value = rootElement.getAttribute(`data-${key}`);
      return [
        key,
        key === "speed" && value !== null
          ? parseInt(value)
          : value ?? defaultValue,
      ];
    })
  );
};
