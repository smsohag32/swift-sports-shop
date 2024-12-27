import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
   return twMerge(clsx(inputs));
}

export const formatStationName = (name) => {
   return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
};

export const generateStationStatData = (stationName) => {
   const income = Math.floor(Math.random() * 1000000);
   const passengers = Math.floor(Math.random() * 50000);
   const bankDebit = Math.floor(Math.random() * 100000);
   const mfsDebit = Math.floor(Math.random() * 50000);

   return {
      income,
      passengers,
      bankDebit,
      mfsDebit,
   };
};
