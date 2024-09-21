import { h } from "preact";
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
}

export const Banner = ({
  text,
  speed,
  backgroundColor,
  textColor,
  fontSize,
  fontWeight,
  children,
}: BannerProps & { children: preact.ComponentChildren }) => {
  const [offset, setOffset] = useState(window.innerWidth); // Start off the screen to the right

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

    const intervalId = startBannerAnimation(bannerWidth); // Start the animation

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [speed]);

  const bannerStyles = {
    transform: `translateX(${offset}px)`, // Move the text based on the offset
    color: textColor,
    fontSize: fontSize,
    fontWeight: fontWeight,
    whiteSpace: "nowrap", // Prevent text wrapping
    position: "absolute", // Allow continuous movement
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
