#!/usr/bin/env node
/**
 * Keeps /content/{locale}.json in sync with the reference locale (en):
 * same keys, same value types, same array lengths, no empty strings, and
 * identical values for identity fields (ids, slugs, dates, site email…) so routes and
 * hreflang alternates line up. TypeScript checks the shape; this checks parity.
 */
import { readFileSync } from "node:fs";

const reference = "en";
const locales = ["ru", "zh-cn", "ar"];
const sharedKeys = new Set(["id", "slug", "date", "officeId", "countryCode", "readingMinutes", "year"]);
const sharedPaths = new Set(["site.email"]);

const load = (locale) => JSON.parse(readFileSync(new URL(`../content/${locale}.json`, import.meta.url), "utf8"));
const typeOf = (value) => (Array.isArray(value) ? "array" : value === null ? "null" : typeof value);

function compare(expected, actual, path, errors) {
  const expectedType = typeOf(expected);
  const actualType = typeOf(actual);
  if (expectedType !== actualType) {
    errors.push(`${path}: expected ${expectedType}, found ${actualType}`);
    return;
  }

  if (expectedType === "array") {
    if (expected.length !== actual.length) {
      errors.push(`${path}: expected ${expected.length} items, found ${actual.length}`);
    }
    expected.slice(0, actual.length).forEach((item, i) => compare(item, actual[i], `${path}[${i}]`, errors));
    return;
  }

  if (expectedType === "object") {
    for (const key of Object.keys(expected)) {
      if (!(key in actual)) errors.push(`${path}.${key}: missing`);
      else compare(expected[key], actual[key], `${path}.${key}`, errors);
    }
    for (const key of Object.keys(actual)) {
      if (!(key in expected)) errors.push(`${path}.${key}: not in ${reference}.json`);
    }
    return;
  }

  const key = path.split(".").pop().replace(/\[\d+\]$/, "");
  const localePath = path.slice(path.indexOf(".") + 1);
  if (typeof actual === "string" && actual.trim() === "") errors.push(`${path}: empty string`);
  if ((sharedKeys.has(key) || sharedPaths.has(localePath)) && expected !== actual) {
    errors.push(`${path}: must equal ${JSON.stringify(expected)}, found ${JSON.stringify(actual)}`);
  }
}

const base = load(reference);
let failed = false;

for (const locale of locales) {
  const errors = [];
  compare(base, load(locale), locale, errors);
  if (errors.length > 0) {
    failed = true;
    console.error(`✗ content/${locale}.json is out of sync with ${reference}.json:`);
    for (const error of errors) console.error(`  - ${error}`);
  }
}

if (failed) process.exit(1);
console.log(`✓ content: ${[reference, ...locales].join(", ")} are in sync`);
