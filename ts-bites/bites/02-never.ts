type Circle = { radius: number; side?: never };
type Square = {  radius?: never; side: number };
type Triangle = { base: number, height: number };
type Shape = Circle | Square | Triangle;

const c:Circle = {
    radius: 5,
    side:    
}

const t: Triangle = {
    base: 2,
    height: 10,
    radius: 10,  // Structural match.
}

const s: Shape = {
    base: 2,
    height: 10,
    radius: 10,  // Structural match.
}