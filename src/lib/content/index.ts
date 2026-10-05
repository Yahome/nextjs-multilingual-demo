import { jsonSource } from "./json-source";
import type { ContentSource } from "./source";

/** Active content source. Replace with a CMS implementation of `ContentSource`. */
export const content: ContentSource = jsonSource;

export type { ContentSource } from "./source";
export type * from "./types";
