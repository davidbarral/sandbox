type Person = {
  id: number;
};

declare const people: Array<Person>;
declare function torture(person: Person): void;

const person = people.find((p) => p.id === 1);

torture(person);
torture(person!);
torture(person as Person);

if (person) {
  torture(person);
}

export {};
