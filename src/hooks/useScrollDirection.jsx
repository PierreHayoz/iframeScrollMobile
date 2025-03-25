import { useState, useEffect } from "react";

function useScrollDirection() {
  const [direction, setDirection] = useState("None");
  
  useEffect(() => {
    let lastX = 0, lastY = 0;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        setDirection(e.deltaX > 0 ? "Horizontal →" : "Horizontal ←");
      } else {
        setDirection(e.deltaY > 0 ? "Vertical ↓" : "Vertical ↑");
      }
    };

    let startX = 0, startY = 0;
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const diffX = e.touches[0].clientX - startX;
      const diffY = e.touches[0].clientY - startY;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        setDirection(diffX > 0 ? "Horizontal →" : "Horizontal ←");
      } else {
        setDirection(diffY > 0 ? "Vertical ↓" : "Vertical ↑");
      }
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return direction;
}

export default useScrollDirection;
