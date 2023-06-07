type T = {
  a: string;
  b: boolean;
};

type A = T["a"];
type B = T["b"];

type V = T["a" | "b"];
type U = T["a"] | T["b"];

// ------------------------

type User = {
  login: string;
};

type Admin = User & {
  level: number;
};

type Worker = User & {
  name: string;
};

type UserType = "admin" | "worker";

function createUser(type: UserType, payload: Admin | Worker) {
  if (type === "admin") {
    console.log(payload.level);
  }

  if (type === "worker") {
    console.log(payload.name);
  }

  throw new Error(`Unknown type ${type}`);
}

createUser("admin", { login: "l", name: "paco" }); // Crap!

// ------------------------
type UserPayload = {
  admin: Admin;
  worker: Worker;
};

type UserTypeAlt = keyof UserPayload;

function isAdmin(type: UserTypeAlt): type is "admin" {
  return type === "admin";
}

function betterCreateUser<Type extends UserTypeAlt>(type: Type, payload: UserPayload[Type]) {
  if (isAdmin(type)) {
    console.log((payload as UserPayload["admin"]).level);
  }
  // etc.
}

betterCreateUser("admin", { login: "l", level: 5 });
betterCreateUser("worker", { login: "l", name: "Paco" });

export {};
