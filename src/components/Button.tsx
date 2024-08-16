import React, { ReactNode, MouseEventHandler } from "react";
import Link from "next/link";

type Mode = "primary" | "secondary" | "tertiary";

interface BaseButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  children: ReactNode;
  fullWidth?: boolean;
  mode?: Mode;
  rounded?: "md" | "lg" | "full";
  extraClasses?: string;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  onClick,
  href,
  children,
  fullWidth = true,
  mode = "primary",
  rounded = "md",
  extraClasses = "",
}) => {
  const colorSchemes: Record<Mode, string> = {
    primary: "bg-black text-white",
    secondary: "bg-gray-500 text-white",
    tertiary: "bg-white text-black",
  };

  const colorClasses = colorSchemes[mode];

  const baseClasses = `${
    fullWidth ? "w-full" : ""
  } ${colorClasses} rounded-${rounded} ${extraClasses} inline-flex items-center justify-center text-lg font-medium transition-colors hover:bg-primary-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2`;

  const buttonElement = (
    <button className={baseClasses} onClick={onClick}>
      {children}
    </button>
  );

  if (href) {
    return (
      <Link href={href} prefetch={false}>
        {buttonElement}
      </Link>
    );
  }

  return buttonElement;
};

export default BaseButton;
