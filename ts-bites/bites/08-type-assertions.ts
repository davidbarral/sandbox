function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new Error("Not a string");
}

let aValue: string | null | undefined;
assertIsString(aValue);

let bValue: string = aValue;

// ------------------------

type AccessLevel = "r" | "w" | "rw";

declare let access: AccessLevel;

function allowsReadAccess(level: AccessLevel): asserts level is "r" | "rw" {
  if (!level.includes("r")) throw new Error("Read not allowed");
}

allowsReadAccess(access);

const x: Extract<AccessLevel, "w"> = access;
