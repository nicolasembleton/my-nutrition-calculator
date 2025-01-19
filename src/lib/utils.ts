import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  const clsxOutput = clsx(inputs);
  const twMergeOutput = twMerge(clsxOutput);
  return twMergeOutput;
}
