import { cn } from "@/lib/utils";
import React from "react";

const CustomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="100 60 410 230"
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
    {...props}
  >
    <path
      d="M296.022 78.831c45.833-.527 112.372 14.649 126.372 24.335 29.4 20.338 49.243 51.39 45.198 76.991-3.876 24.532-37.969 64.638-54.627 73.508-15.655 8.336-70.542 23.012-116.017 21.344-66.116-2.425-122.604-17.699-150.794-44.792-20.811-20.001-17.838-39.589-17.696-58.251.308-40.364 35.775-67.788 63.548-77.249 18.429-6.278 66.099-15.449 104.016-15.885Zm85.256 63.305c-3.257.748 2.249 20.807-7.98 27.952-12.909 9.017-29.018 19.119-74.45 18.211-51.546-1.031-68.229-20.513-77.641-32.211-4.706-5.85-4.813-22.913-8.848-24.541-5.512-2.223-26.714 21.245-26.714 35.299 0 30.275 45.331 57.816 106.761 57.816s116.932-25.244 116.932-55.519c0-14.054-22.899-28.192-28.06-27.007"
    />
  </svg>
);

export function Logo(
  {theme = "secondary", size = "medium"}:
  {theme?: "primary" | "secondary" | "white" | "black", size?: "large" | "medium" | "small"}
) {
  const colorVariable = 
    theme === "white" ? "white" : 
    theme === "black" ? "black" : 
    theme === "secondary" ? "var(--color-secondary)" : 
    "var(--color-primary)";

  const childTextColorClass = {
    white: "[&>*]:text-white",
    black: "[&>*]:text-black",
    secondary: "[&>*]:text-secondary",
    primary: "[&>*]:text-primary"
  }[theme];

  return (
    <div className="hcc flex-col">
      <CustomIcon
        className={cn("inline-block",
          size === "large" ? "lg:size-24 size-18" :
          size === "medium" ? "lg:size-18 size-12" :
          size === "small" ? "lg:size-12 size-6" : ""
        )}
        style={{ fill: colorVariable }}
      />
      <div className={cn(childTextColorClass)}>
        <h1 className={cn("font-heading font-serif",
          size === "large" ? "text-5xl" :
          size === "medium" ? "text-3xl leading-6" :
          size === "small" ? "text-xl leading-4" : ""
        )}>
          ObaaSIWA
        </h1>
      </div>
    </div>
  );
}
