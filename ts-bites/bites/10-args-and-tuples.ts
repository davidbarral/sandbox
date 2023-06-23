declare function sum1(x: number, y: number): number;

sum1(1, 2);

declare function sum2(...args: number[]): number;

sum2(1, 2, 3);

declare function sum3(x: number, y: number, ...args: number[]): number;

sum3(1, 2);
sum3(1, 2, 3);

declare function sum4(...args: [number, number]): number;

sum4(1, 2);

declare function sum5(...args: [x: number, y: number]): number;

sum5(1, 2);

declare function sum6(...mandatoryArgs: [number, number], ...additionalArgs: number[]): number;

sum6(1, 2, 3);

declare function sum8(x: number, y: number, z?: number): number;

sum8(1, 2);
sum8(1, 2, 3);
sum8();

type Args = [x: number, y: number] | [x: number, y: number, z: number];

declare function sum9(...args: Args): number;

sum9(1, 2);
sum9(1, 2, 3);

export {};
