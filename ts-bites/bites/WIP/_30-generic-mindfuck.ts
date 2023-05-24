function join<T>(a: T, b: T): T {
  // Whatever
  return {} as T;
}

join(1, 2);
join("a", "b");

let a = 1;
let b = 2;

join(a, b);

join<string>("a", "b");

type A = {
  a: number;
};

type B = {
  b: string;
};

function cloneBroken<T extends A | B>(item: T): T extends A ? A : B {
  if ("a" in item) {
    return { a: item.a };
  }

  return { b: item.b };
}

cloneBroken({ a: 1 });
cloneBroken({ b: "B" });

// Fuck me
type AorB<T extends A | B> = T extends A ? A : B;

function clone<T extends A | B>(item: T): T extends A ? A : B {
  if ("a" in item) {
    return { a: item.a } as AorB<T>;
  }

  return { b: item.b } as AorB<T>;
}

clone({ a: 1 });
clone({ b: "B" });
