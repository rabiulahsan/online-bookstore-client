/* eslint-disable react/prop-types */
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

const StaggerAnimation = ({ text }) => {
  const textRef = useRef(null);

  useGSAP(() => {
    // Get the text content of the .name element
    const nameElement = textRef.current;
    const text = nameElement.textContent;

    // Clear the original text and split it into spans
    nameElement.innerHTML = text
      .split("") // Split text into individual characters
      .map(
        (char) =>
          char === " " // Check if the character is a space
            ? `<span style="display: inline-block; width: 0.4em;">&nbsp;</span>` // Space with a span
            : `<span style="display: inline-block;">${char}</span>` // Normal character
      )
      .join(""); // Wrap each character in a span

    let tl = gsap.timeline();
    tl.from(".text span", {
      y: -70,
      opacity: 0,
      delay: 0.5,
      stagger: 0.15,
    });
  });
  return (
    <div className="text-center my-[4%]">
      <p ref={textRef} className="text font-bold text-4xl text-slate-700">
        {text}
      </p>
    </div>
  );
};

export default StaggerAnimation;
