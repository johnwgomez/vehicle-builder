// definition of the Drivable interface
export interface Driveable {
  //vin: string;
  //make: string;
  //model: string;
  //vehicle: string;
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
