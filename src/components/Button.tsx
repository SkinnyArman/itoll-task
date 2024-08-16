import React, { ReactNode, MouseEventHandler } from "react";
import Link from "next/link";
import { AiOutlineLoading } from "react-icons/ai";

type Mode = "primary" | "secondary" | "tertiary";

interface BaseButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  children: ReactNode;
  fullWidth?: boolean;
  mode?: Mode;
  loading?: boolean;
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
  loading = false,
  extraClasses = "",
}) => {
  const colorSchemes: Record<Mode, string> = {
    primary: "bg-primary text-text",
    secondary: "bg-grey text-text",
    tertiary: "bg-white text-text",
  };

  const colorClasses = colorSchemes[mode];

  const baseClasses = `${
    fullWidth ? "w-full" : ""
  } ${colorClasses} rounded-${rounded} ${extraClasses} inline-flex items-center justify-center text-lg font-medium transition-colors hover:bg-primary-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2`;

  const buttonElement = (
    <button className={baseClasses} onClick={onClick} disabled={loading}>
      {loading ? <AiOutlineLoading className="animate-spin mr-2" /> : children}
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
