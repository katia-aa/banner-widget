import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

// Define the Banner component
interface BannerProps {
  text: string;
  speed: number; // Speed is now a number for better control
  backgroundColor: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
}

const Banner = ({
  text,
  speed,
  backgroundColor,
  textColor,
  fontSize,
  fontWeight,
}: BannerProps) => {
  const [offset, setOffset] = useState(window.innerWidth); // Start off the screen to the right

  useEffect(() => {
    const banner = document.getElementById("banner-text");
    const bannerWidth = banner?.offsetWidth || 0; // Get banner width

    const interval = setInterval(() => {
      // Move left continuously, reset when it goes completely off-screen to the left
      setOffset((prev) => (prev > window.innerWidth ? -bannerWidth : prev + 2)); // Adjust '2' for speed
    }, 20); // Adjust speed of animation by modifying interval duration

    return () => clearInterval(interval);
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
        backgroundColor: backgroundColor,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        id="banner-text"
        style={bannerStyles} // Apply custom inline styles here
      >
        {text}
      </div>
    </div>
  );
};

export default Banner;
