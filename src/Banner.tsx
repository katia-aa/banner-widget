import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";

// Define the Banner component
interface BannerProps {
  text: string;
  speed: number; // Speed controls how fast the banner moves
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  children?: preact.ComponentChildren; // Optional children prop
  variant: Variant;
}

export const Banner = ({
  text,
  speed,
  backgroundColor,
  textColor,
  fontSize,
  fontWeight,
  children,
  variant,
}: BannerProps & { children: preact.ComponentChildren }) => {
  const [offset, setOffset] = useState(window.innerWidth); // Start off the screen to the right
  const IS_MOVING_BANNER = variant === Variant.DEFAULT;

  // Function to handle the banner animation logic
  const startBannerAnimation = (bannerWidth: number) => {
    return setInterval(() => {
      let calculatedSpeed = 1;
      if (speed == 2) calculatedSpeed = 2;

      // Move left continuously, reset when it goes completely off-screen to the left
      setOffset((prev) =>
        prev > window.innerWidth ? -bannerWidth : prev + calculatedSpeed
      );
    }, 20);
  };

  useEffect(() => {
    const banner = document.getElementById("banner-text");
    const bannerWidth = banner?.offsetWidth || 0; // Get banner width
    let intervalId: number;
    if (IS_MOVING_BANNER) {
      intervalId = startBannerAnimation(bannerWidth); // Start the animation
    }

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [speed]);

  const bannerStyles = {
    transform: IS_MOVING_BANNER ? `translateX(${offset}px)` : undefined, // Move the text based on the offset
    whiteSpace: IS_MOVING_BANNER ? "nowrap" : undefined, // Prevent text wrapping
    position: IS_MOVING_BANNER ? "absolute" : undefined, // Allow continuous movement
    color: textColor,
    fontSize: fontSize,
    fontWeight: fontWeight,
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "30px",
        backgroundColor,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div id="banner-text" style={bannerStyles}>
        {children || text}
      </div>
    </div>
  );
};

export enum Variant {
  COOKIE = "COOKIE",
  ANNOUNCEMENT = "ANNOUNCEMENT",
  DEFAULT = "DEFAULT",
}

interface BannerWrapperProps {
  text: string;
  speed: number;
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  variant: Variant;
}

export const BannerWrapper = ({
  text,
  speed,
  backgroundColor,
  textColor,
  fontSize,
  fontWeight,
  variant = "DEFAULT" as Variant,
}: BannerWrapperProps) => {
  return (
    <Banner
      text={text}
      speed={speed}
      backgroundColor={backgroundColor}
      textColor={textColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      variant={variant}
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
