/// <reference types="firebase" />

import { format } from "date-fns";

import LooseObject from "../../types/LooseObject";

type DateOrTimestamp = Date | firebase.firestore.Timestamp;

export function castDate(timestamp: DateOrTimestamp | undefined): Date | undefined {
  return timestamp && "seconds" in timestamp
    ? new Date(timestamp.seconds * 1000)
    : timestamp;
}

export function formatDate(timestamp: DateOrTimestamp | undefined, dateformat = "yyyy-MM-dd"): string | undefined {
  return timestamp
    ? format(castDate(timestamp) as Date, dateformat)
    : timestamp;
}

/**
 * Cast all Firestore Timestamps to Javascript Dates inside an object
 * @see https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
 *
 * @param {*} object
 * @returns
 */
export function castDatesInObject(object: LooseObject): LooseObject {
  return walkObject(object, castDate);
}

/**
 * Format all dates
 *
 * @param {*} object
 * @returns
 */
export function formatDatesInObject(object: LooseObject, format = "yyyy-MM-dd"): LooseObject {
  return walkObject(object, (prop: any) => formatDate(prop, format));
}

function walkObject(object: LooseObject, callback: Function): LooseObject {
  for (const key in object) {
    let prop = object[key];
    if (typeof prop === "object") {
      if (prop.seconds || prop instanceof Date) {
        object[key] = callback(prop);
      } else {
        object[key] = walkObject(prop, callback);
      }
    }
  }
  return object;
}
