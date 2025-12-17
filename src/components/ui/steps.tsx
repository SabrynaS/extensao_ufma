"use client";

import React, { useEffect } from "react";
import { Check } from "lucide-react";

interface StepsProps {
  steps: string[];
  current: number;
}

interface StepsContentProps {
  step: number;
  content1: React.ReactNode;
  content2: React.ReactNode;
  content3?: React.ReactNode;
  content4?: React.ReactNode;
}

export const Steps: React.FC<StepsProps> = ({ steps, current }) => {
  return (
    <div className="w-full px-4 sm:px-10">
      <ol className="flex items-center justify-between w-full text-sm font-medium text-center text-muted-foreground sm:text-base">
        {steps.map((_, index) => (
          <li
            key={`${index}-step`}
            className="relative flex-1 flex flex-col items-center"
          >
            <div className="flex items-center justify-center w-[30px] h-[30px] z-10 relative">
              <span
                className={`flex items-center justify-center text-white text-[16px] transition-all delay-50 duration-300 ease-in-out font-bold rounded-full shrink-0 ${
                  current > index + 1
                    ? "w-[18px] h-[18px] bg-primary"
                    : current === index + 1
                    ? "w-[30px] h-[30px] bg-primary"
                    : "w-[10px] h-[10px] bg-muted"
                }`}
              >
                {current > index + 1 ? (
                  <Check className="w-4 h-4" />
                ) : (
                  current === index + 1 && index + 1
                )}
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-1/2 left-[calc(48%)] w-[calc(100%+6px)] h-[2px] -translate-y-1/2 z-0 transition-all duration-300 ${
                  current > index + 1 ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </li>
        ))}
      </ol>

      <div className="flex justify-between mt-2 w-full">
        {steps.map((step, index) => (
          <div
            key={index}
            className="w-[30px] flex-1 text-center font-bold text-[10px] sm:text-[14px] leading-tight whitespace-pre-line break-words transition-colors duration-300"
            style={{
              color:
                current === index + 1
                  ? "hsl(var(--primary))"
                  : "hsl(var(--muted-foreground))",
              letterSpacing: "0.02em",
            }}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
};

export const StepsContent: React.FC<StepsContentProps> = ({
  step,
  content1,
  content2,
  content3,
  content4,
}) => {
  const baseClasses =
    "w-full overflow-hidden ease-out transition-all duration-500 delay-50";

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [step]);

  const isVisible = (s: number) =>
    step === s ? "opacity-100" : "max-h-0 opacity-0 pointer-events-none";

  return (
    <div className="flex flex-col place-items-center w-full transform transition-all duration-500">
      <div className={`${baseClasses} ${isVisible(1)}`}>{content1}</div>
      <div className={`${baseClasses} ${isVisible(2)}`}>{content2}</div>
      {content3 && (
        <div className={`${baseClasses} ${isVisible(3)}`}>{content3}</div>
      )}
      {content4 && (
        <div className={`${baseClasses} ${isVisible(4)}`}>{content4}</div>
      )}
    </div>
  );
};
