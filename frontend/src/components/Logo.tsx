import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export const Logo = ({
  className,
  children,
  ...props
}: ComponentProps<'h1'>) => (
  <h1
    className={twMerge(
      "text-2xl font-bold text-white cursor-pointer select-none",
      className
    )}
    {...props}
  >
    <Link to='/'>
    {children || "Hostel Management - Outpass"}
    </Link>
  </h1>
);