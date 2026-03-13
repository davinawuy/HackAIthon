import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatEventDate = (dateISO: string) => {
  const date = new Date(dateISO);
  return new Intl.DateTimeFormat("en-AU", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const normalize = (value: string) => value.trim().toLowerCase();
