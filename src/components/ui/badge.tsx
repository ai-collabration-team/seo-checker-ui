import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-800/50 text-slate-100",
        secondary:
          "border-slate-700/50 bg-slate-800/50 text-slate-100",
        destructive:
          "border-red-900/50 bg-red-900/20 text-red-200",
        outline:
          "border-slate-700/50 text-slate-200",
        success:
          "border-green-900/50 bg-green-900/20 text-green-200",
        warning:
          "border-amber-900/50 bg-amber-900/20 text-amber-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
