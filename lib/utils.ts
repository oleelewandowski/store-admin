import { type ClassValue, clsx } from "clsx";
import { NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const isRequired = (items: (string | number | boolean)[]) => {
  const errors: (string | number | boolean)[] = [];

  items.forEach((item) => {
    if (!item) {
      errors.push(item);
    }
  });

  return new NextResponse(`REQUIRED PROPERTIES: ${errors.join(", ")}`, {
    status: 400,
  });
};
