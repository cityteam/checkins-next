// @/types/types.ts

/**
 * Global types for this application.
 *
 * @packageDocumentation
 */

// External Modules ----------------------------------------------------------

import { Ban, Checkin, Facility, Guest, Prisma, Template } from "@prisma/client";

// Internal Modules ----------------------------------------------------------

// Public Objects ------------------------------------------------------------

// Facility with all possible children
export type FacilityPlus = Facility & {
  bans: Ban[];
  checkins: Checkin[];
  guests: Guest[];
  templates: Template[];
}

