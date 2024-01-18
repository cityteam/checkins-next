// @/app/layout.tsx

/**
 * Global layout for this application.
 *
 * @packageDocumentation
 */

// External Modules ----------------------------------------------------------

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

// Internal Modules ----------------------------------------------------------

import "./globals.css";
import { ThemeWrapper } from "@/components/layout/ThemeWrapper";
import { ThemeContextProvider } from "@/contexts/ThemeContext";

// Public Objects ------------------------------------------------------------

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "CityTeam Checkins",
  description: "Guest Checkins application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContextProvider>
          <ThemeWrapper>
            {/* TODO - navbar goes here */}
            {children}
          </ThemeWrapper>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
