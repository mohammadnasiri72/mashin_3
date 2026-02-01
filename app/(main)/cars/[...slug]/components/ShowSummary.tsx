import React, { useEffect, useRef, useState } from "react";

interface ExpandableTextProps {
  text: string;
  maxHeight?: number; // ارتفاع بر حسب پیکسل
}

const ShowSummary: React.FC<ExpandableTextProps> = ({
  text = "",
  maxHeight = 96, // 4 خط (24px × 4)
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [currentHeight, setCurrentHeight] = useState<string>("0px");
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const textElement = textRef.current;
      const isOverflowing = textElement.scrollHeight > maxHeight;
      setShowButton(isOverflowing);

      // تنظیم ارتفاع اولیه
      if (isOverflowing) {
        setCurrentHeight(`${maxHeight}px`);
      } else {
        setCurrentHeight("auto");
      }
    }
  }, [text, maxHeight]);

  useEffect(() => {
    if (textRef.current && showButton) {
      const textElement = textRef.current;
      if (isExpanded) {
        // انیمیشن برای باز شدن
        setCurrentHeight(`${textElement.scrollHeight}px`);
      } else {
        // انیمیشن برای بسته شدن
        setCurrentHeight(`${maxHeight}px`);
      }
    }
  }, [isExpanded, showButton, maxHeight]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-6">
      <div
        ref={textRef}
        className="text-gray-800 leading-relaxed whitespace-pre-line overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          maxHeight: currentHeight,
          // حذف اسکرول داخلی
          WebkitMaskImage:
            !isExpanded && showButton
              ? "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)"
              : "none",
          maskImage:
            !isExpanded && showButton
              ? "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)"
              : "none",
        }}
      >
        {text}
      </div>

      {showButton && (
        <button
          onClick={handleToggle}
          className="cursor-pointer flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-300 group"
        >
          <span className="relative overflow-hidden">
            {isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}
            <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
          </span>

          <svg
            className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ShowSummary;
