import React, { useState } from "react";

const Tooltip = ({ children, text }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    setTooltipPosition({ x, y });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div className="bg-[#121212] text-stone-400 ml-6 border border-stone-600 text-center ease-in-out text-xs py-1 px-4 absolute z-10 pointer-events-none">
          <p className="md:text-nowrap">{text}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
