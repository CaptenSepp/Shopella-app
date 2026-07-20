import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// AI Elements uses this helper to combine generated utility classes safely.
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
