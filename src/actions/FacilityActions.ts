"use server";

// @/actions/FacilityActions.ts

/**
 * Server side actions for Facility model objects.
 *
 * @packageDocumentation
 */

// External Modules ----------------------------------------------------------

import { Facility, Prisma } from "@prisma/client";

// Internal Modules ----------------------------------------------------------

import { db } from "@/lib/db";
import {
  BadRequest,
  NotFound,
  NotUnique,
  ServerError,
} from "@/lib/HttpErrors";
import { logger } from "@/lib/ServerLogger";
import { FacilityPlus } from "@/types/types";

// Public Types --------------------------------------------------------------

export type FacilityMultipleOpts = {
  // Fetch only Facilities with matching active state? [no default]
  active?: boolean;
  // Wildcard match on name
  name?: string;
  // Number of rows to skip at the beginning of the returned values [0]
  skip?: number;
  // Number of rows to return [no default]
  take?: number;
  // Include child Bans? [false]
  withBans?: boolean;
  // Include child Templates? [false]
  withTemplates?: boolean;
}

// TODO: Use this in exact() and find()
export type FacilitySingleOpts = {
  // Include child Bans? [false]
  withBans?: boolean;
  // Include child Templates? [false]
  withTemplates?: boolean;
}

// Public Actions ------------------------------------------------------------

/**
 * Return all Facilities that match the specified options criteria.
 *
 * @param opts                          Optional filter/include criteria
 *
 * @throws ServerError                  If a low level error occurs
 */
export const all = async (opts: FacilityMultipleOpts = {}): Promise<FacilityPlus[]> => {

  logger.info({
    context: "FacilityActions.all",
    opts,
  });

  try {
    const args: Prisma.FacilityFindManyArgs = {
      orderBy: { name: "asc" },
    };
    if ((opts.active !== undefined) || opts.name) {
      args.where = {};
    }
    if (opts.active !== undefined) {
      args.where!.active = {
        equals: opts.active,
      }
      if (opts.name) {
        args.where!.name = {
          contains: opts.name,
          mode: "insensitive",
        }
      }
    }
    args.skip = opts.skip ? opts.skip : undefined;
    args.take = opts.take ? opts.take : undefined;
    if (opts.withBans || opts.withTemplates /* or any other withXXX */) {
      args.include = {};
    }
    if (opts.withBans) {
      args.include!.bans = {
        orderBy: { fromDate: "asc" },
      }
    }
    if (opts.withTemplates) {
      args.include!.templates = {
        orderBy: { name: "asc" },
      }
    }
    return await db.facility.findMany(args) as FacilityPlus[];
  } catch (error) {
    throw new ServerError(error as Error, "FacilityActions.all");
  }

}

/**
 * Return the requested Facility (if any) by name.  Otherwise, return null.
 *
 * @param name                          Name of the Facility to be returned
 *
 * @throws ServerError                  If a low level error occurs
 */
export const exact = async (name: string): Promise<Facility | null> => {

  logger.info({
    context: "FacilityActions.exact",
    name,
  });

  try {
    return db.facility.findUnique({
      where: {
        name,
      }
    });
  } catch (error) {
    throw new ServerError(error as Error, "FacilityActions.exact");
  }

}

/**
 * Return the requested Facility (if any) by ID.  Otherwise, return null.
 *
 * @param facilityId                    ID of the Facility to be returned
 *
 * @throws ServerError                  If a low level error occurs
 */
export const find = async (facilityId: number): Promise<Facility | null> => {

  logger.info({
    context: "FacilityActions.find",
    facilityId,
  });

  try {
    return await db.facility.findUnique({
      where: {
        id: facilityId,
      }
    });
  } catch (error) {
    throw new ServerError(error as Error, "FacilityActions.find");
  }

}

/**
 * Create and return a new Facility.
 *
 * @param facility                      Facility to be created
 *
 * @throws BadRequest                   If validation fails
 * @throws NotUnique                    If a unique key violation is attempted
 * @throws ServerError                  If a low level error occurs
 */
export const insert = async (
  facility: Prisma.FacilityUncheckedCreateInput,
): Promise<Facility> => {

  logger.info({
    context: "FacilityActions.insert",
    facility,
  });

  // TODO - validations
  if ((await exact(facility.name)) !== null) {
    throw new NotUnique("That facility name is already in use");
  }

  try {
    return await db.facility.create({
      data: facility,
    });
  } catch (error) {
    throw new ServerError(error as Error, "FacilityActions.insert");
  }

}

/**
 * Remove an existing Facility (as well as its children), if any, and return
 * the removed Facility object.
 *
 * @param facilityId                    ID of the Facility to be removed
 *
 * @throws ServerError                  If a low level error occurs
 */
export const remove = async (facilityId: number): Promise<Facility> => {

  logger.info({
    context: "FacilityActions.remove",
    facilityId,
  });

  // TODO: validations
  if (!(await find(facilityId))) {
    throw new NotFound(
      `Missing Facility '${facilityId}'`,
      "FacilityActions.remove",
    );
  }

  try {
    return await db.facility.delete({
      where: {
        id: facilityId,
      }
    });
  } catch (error) {
    throw new ServerError(error as Error, "FacilityActions.remove");
  }

}

/**
 * Update an existing Facility, and return the updated value.
 *
 * @param facilityId                    ID of the Facility to be updated
 * @param facility                      Facility values to be updated
 *
 * @throws BadRequest                   If validation fails
 * @throws NotUnique                    If a unique key violation is attempted
 * @throws ServerError                  If a low level error occurs
 */
export const update = async (
  facilityId: number,
  facility: Prisma.FacilityUncheckedUpdateInput,
): Promise<Facility> => {

  logger.info({
    context: "FacilityActions.update",
    facilityId,
    facility,
  });

  // TODO: validations
  if (!(await find(facilityId))) {
    throw new NotFound(
      `Missing Facility '${facilityId}'`,
      "FacilityActions.update",
    );
  }
  if (facility.name) {
    const result = await exact(facility.name as string);
    if (result && (result.id !== facilityId)) {
      throw new NotUnique("That name is already in use");
    }
  }

  try {
    return await db.facility.update({
      data: {
        ...facility,
        id: facilityId,                 // No cheating
      },
      where: {
        id: facilityId,
      }
    });
  } catch (error) {
    throw new ServerError(error as Error, "FacilityActions.update");
  }

}
