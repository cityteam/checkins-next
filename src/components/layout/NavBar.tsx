"use client";

// @/components/layout/NavBar.tsx

/**
 * Navigation bar for the global layout of this application.
 *
 * @packageDocumentation
 */

// External Modules ----------------------------------------------------------

import Link from "next/link";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

export const NavBar = () => {
  return (
    <div className="flex justify-between mb-2 px-2 py-2 items-center bg-base-200">
      <Link href="/">
        <span className="font-semibold">CityTeam Checkins</span>
      </Link>
      <div>
        <span>TODO: ThemeSwitcher</span>
      </div>
    </div>
  )
}
