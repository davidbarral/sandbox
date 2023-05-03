function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") throw new Error("Not a string");
}

const aValue: string | null | undefined = "Hello";
assertIsString(aValue);

// ------------------------

type AccessLevel = "r" | "w" | "rw";

declare let access: AccessLevel;

function allowsReadAccess(level: AccessLevel): asserts level is "r" | "rw" {
  if (!level.includes("r")) throw new Error("Read not allowed");
}

allowsReadAccess(access);

const x: Extract<AccessLevel, "w"> = access;
