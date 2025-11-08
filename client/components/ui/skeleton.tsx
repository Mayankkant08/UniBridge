<<<<<<< HEAD
import { cn } from "@/lib/utils"
=======
import { cn } from "../../lib/utils"
>>>>>>> 808500ead14b325b92923908df2f4f759a17dc06

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
