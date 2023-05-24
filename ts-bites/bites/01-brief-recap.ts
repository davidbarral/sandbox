// INFERENCIA 

const a = 5;
const b:number = 5;


// TIPADO ESTRUCTURAL
type Obj = {
  s: string;
  b?: boolean;
  c: number | null | undefined;
}

const o1 = {
  s: "S",
  c: 5,
  d: "suspicious...",
}

const o2:Obj = o1


// INTERFACES Y TIPOS
interface Animal {
  name: string;
  speak: () => void;
}

interface Lion extends Animal {
  run: (speed: number) => void;
}

type Animal2 = {
  name: string;
  speak: () => void;
}

interface Lion2 extends Animal2 {
  run: (speed: number) => void;
}

type Lion3 = Animal2 & {
  run: (speed: number) => void;
}

const leo = {
  name: "Leo",
  speak() { console.log("groarr") }; 
  run(speed: number) {}
}

const l1:Lion = leo;
const l2:Lion2 = leo;
const l3:Lion3 = leo;


// FUNCTIONES
function sum(a: number, b: number):number {
  return a+b;
}

type B = { a: number }

type X = {a: number} extends B ? true : false


// GENÉRICOS.... HOLY SHIT
function sumsum<T>(a: T, b: T):T {
  // Type narrowing...
  if (typeof a === "number" && typeof a === typeof b) {
    return a + (b as number) as T;
  }

  if (typeof a === "string" && typeof b === "string") {
    return [a,b].join() as T;
  }

  if (typeof a === "boolean" && typeof b === "boolean") {
    return a && b as T;
  }

  throw new Error("Unsupported sum");
}

export {}
