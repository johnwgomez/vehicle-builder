// definition of the Drivable interface
export interface Drivable {
  // declare the properties
  started: boolean;
  currentSpeed: number;
  // declare the methods
  start(): void;
  accelerate(change: number): void;
  decelerate(change: number): void;
  stop(): void;
  turn(direction: string): void;
  reverse(): void;
}
