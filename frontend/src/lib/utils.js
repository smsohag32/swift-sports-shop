import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
   return twMerge(clsx(inputs));
}

export const formatStationName = (name) => {
   return name
      .split("-") // Split by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter and make rest lowercase
      .join(" ");
};

export const generateStationStatData = (stationName) => {
   const income = Math.floor(Math.random() * 1000000); // Example dynamic value
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
