import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const BackgroundGrid = ({children, className, ...props }: ComponentProps<'div'>) => (
    <div {...props} className={twMerge("absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]", className)}>
   <div className="relative">

   {children} 
   </div>
   </div>
)