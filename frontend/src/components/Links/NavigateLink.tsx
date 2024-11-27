import { ComponentProps } from "react";
import { Link } from "react-router-dom";

export const NavigateLink = ({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      className={`
        ${className ?? ""}
        text-blue-500
        font-medium
        hover:text-blue-600
        active:text-blue-700
        underline-offset-4
        hover:underline
        transition
        duration-300
        ease-in-out
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        focus:ring-offset-2
      `}
    >
      {children}
    </Link>
  );
};