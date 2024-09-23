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
  link: string;
  linkText: string;
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
  link,
  linkText,
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

  const movingBannerStyles = {
    transform: IS_MOVING_BANNER ? `translateX(${offset}px)` : undefined, // Move the text based on the offset
    whiteSpace: IS_MOVING_BANNER ? "nowrap" : undefined, // Prevent text wrapping
    position: IS_MOVING_BANNER ? "absolute" : undefined, // Allow continuous movement
    color: textColor,
    fontSize: fontSize,
    fontWeight: fontWeight,
  };

  const bannerStyles = {
    color: textColor,
    fontSize: fontSize,
    fontWeight: fontWeight,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        borderRadius: "8px",
        backgroundColor,
        display: "flex",
        alignItems: "center",
        height: IS_MOVING_BANNER ? "50px" : undefined,
      }}
    >
      <div
        id="banner-text"
        style={IS_MOVING_BANNER ? movingBannerStyles : bannerStyles}
      >
        {children || (
          <div>
            {text} Check out the<a href={link}>{linkText}</a>
          </div>
        )}
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
  buttonText: string;
  link: string;
  linkText: string;
  cookiePolicyLink: string | null;
}

export const BannerWrapper = ({
  text,
  speed,
  backgroundColor,
  textColor,
  fontSize,
  fontWeight,
  variant = "DEFAULT" as Variant,
  buttonText,
  link,
  linkText,
  cookiePolicyLink,
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
      link={link}
      linkText={linkText}
    >
      {variant === "ANNOUNCEMENT" ? (
        <Fragment>
          <div>{text}</div>
          <button className="bg-white hover:bg-white text-black font-bold py-2 px-4 rounded">
            {buttonText}
          </button>
        </Fragment>
      ) : variant === "COOKIE" ? (
        <Fragment>
          <div>
            We use third-party cookies in order to personalize your experience{" "}
            <span>
              Read our <a href={cookiePolicyLink || undefined}>Cookie Policy</a>
            </span>
          </div>
          <div>
            <button className="bg-white hover:bg-white text-black font-bold py-2 px-4 rounded">
              Accept
            </button>
            <button className="bg-white hover:bg-white text-black font-bold py-2 px-4 rounded">
              Decline
            </button>
          </div>
        </Fragment>
      ) : null}
    </Banner>
  );
};
