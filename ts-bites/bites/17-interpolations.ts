type UUID = string;

declare function find(uuid: UUID): unknown;

find("sadsada"); // :(

type UUID2 = `${number}-${number}-${number}-${number}`;

declare function find2(uuid: UUID2): unknown;

find2("sadsada");
find2("1234-1234-1234-1234");

type EnsureUrl<Url extends string> = Url extends `https://${string}.${string}`
  ? Url
  : `${Url} is not a valid URL String`;

declare function parseUrl<Url extends string>(url: EnsureUrl<Url>): void;

parseUrl(5);
parseUrl("ooops");
parseUrl("https://omg.com");

type T = {
  one: number;
  two: string | null;
  three?: boolean;
};

type Setters<T extends Record<string, unknown>> = {
  [K in keyof T & string as `set${Capitalize<K>}`]: (newValue: T[K]) => void;
};

type TSetters = Setters<T>;

declare function createPojo<T extends Record<string, unknown>>(pojo: T): T & Setters<T>;

const pojo = createPojo({ one: "hola" });
pojo.setOne("adios");

export {};
