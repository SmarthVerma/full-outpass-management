import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ className, children, ...props }: ActionButtonProps) => (
  <button
    className={twMerge(
      'px-2 py-1 rounded-md border-zinc-400/50 hover:bg-zinc-200/50 transition-colors duration-100 select-none',
      className
    )}
    {...props}
  >
    {children}
  </button>
)

