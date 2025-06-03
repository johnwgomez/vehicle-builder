# Vehicle Builder CLI

A command-line TypeScript application for creating and using Cars, Trucks, and Motorbikes.

## Description

Vehicle Builder is an interactive CLI that lets you:

- **Create** new vehicles of type Car, Truck, or Motorbike
- **Select** existing vehicles to perform actions
- **Perform** generic drive actions (start, accelerate, decelerate, turn, reverse, stop)
- **Use** class-specific actions:
  - **Car**: Honk
  - **Truck**: Tow other vehicles
  - **Motorbike**: Pop a wheelie
- **Persist** created vehicles to a JSON file (vehicles.json) and reload them on start

This project demonstrates object-oriented design in TypeScript, leveraging interfaces and inheritance to model different vehicle behaviors.

---

## Table of Contents

1. [User Story & Acceptance Criteria](#user-story--acceptance-criteria)  
2. [Installation](#installation)  
3. [Usage](#usage)  
4. [Project Structure](#project-structure)  
5. [Classes & Interfaces](#classes--interfaces)  
6. [Walkthrough Video](#walkthrough-video)  

---

## User Story & Acceptance Criteria

**User Story**  
> AS a developer  
> I WANT to update an existing application to include additional vehicle types  
> SO THAT I am able to comprehend and work with existing code bases.

**Acceptance Criteria**  
- Upon start, the CLI prompts to “Create a new vehicle” or “Select an existing vehicle.”  
- When creating, you can choose between Car, Truck, and Motorbike.  
- Each vehicle type prompts for its own properties (e.g. Trucks ask for towing capacity; Motorbikes ask for wheel specs).  
- After creation or selection, you can perform actions until you choose “Exit.”  
- Actions include:
  - **All types**: Print details, Start vehicle, Accelerate 5 MPH, Decelerate 5 MPH, Turn right, Turn left, Reverse, Stop vehicle
  - **Car**: Honk
  - **Truck**: Tow (able to tow only if within towing capacity; cannot tow itself)
  - **Motorbike**: Wheelie  
- Vehicles are saved to `vehicles.json` and reloaded automatically on restart.

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/johnwgomez/vehicle-builder
   cd vehicle-builder
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Build the TypeScript code**  
   ```bash
   npm run build
   ```

---

## Usage

1. **Run the CLI**  
   ```bash
   npm start
   ```

2. **Create or Select a Vehicle**  
   - Use the arrow keys to choose “Create a new vehicle” or “Select an existing vehicle.”  
   - If creating:
     - **Car**: Enter color, make, model, year, weight, top speed  
     - **Truck**: Enter color, make, model, year, weight, top speed, towing capacity  
     - **Motorbike**: Enter color, make, model, year, weight, top speed, front wheel diameter/brand, rear wheel diameter/brand  
   - If selecting, pick from the list of previously created VINs.

3. **Perform Actions on the Vehicle**  
   - Common actions:  
     - **Print details**: View all stored properties  
     - **Start vehicle**  
     - **Accelerate 5 MPH**  
     - **Decelerate 5 MPH**  
     - **Stop vehicle**  
     - **Turn right / Turn left / Reverse**  
   - Class-specific:  
     - **Car** → Honk  
     - **Truck** → Tow (choose another vehicle in the list)  
     - **Motorbike** → Wheelie  
   - “Select or create another vehicle” returns to the main menu.  
   - “Exit” closes the application.

4. **Persistence**  
   - All created vehicles are stored in `vehicles.json` after each creation.  
   - When you restart, the CLI will load any saved vehicles automatically.

---

## Project Structure

```
vehicle-builder/
├── dist/                     # Compiled JavaScript output (ignored by Git)
├── src/
│   ├── classes/
│   │   ├── Car.ts
│   │   ├── Cli.ts
│   │   ├── Motorbike.ts
│   │   ├── Truck.ts
│   │   ├── Vehicle.ts
│   │   └── Wheel.ts
│   ├── interfaces/
│   │   └── Driveable.ts
│   ├── index.ts
│   └── vehicles.json         # Stores persisted vehicle data
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

- **`src/classes/Vehicle.ts`**  
  Base abstract class implementing the `Driveable` interface (manages `started`, `currentSpeed`, and common drive methods).

- **`src/classes/Car.ts`**  
  Extends `Vehicle`; properties: `vin`, `color`, `make`, `model`, `year`, `weight`, `topSpeed`, `wheels: Wheel[]`; includes `honk()` and overrides `printDetails()`.

- **`src/classes/Truck.ts`**  
  Extends `Vehicle`; properties: `vin`, `color`, `make`, `model`, `year`, `weight`, `topSpeed`, `wheels: Wheel[]`, `towingCapacity`; includes `canTow()` and `tow()`, overrides `printDetails()`.

- **`src/classes/Motorbike.ts`**  
  Extends `Vehicle`; properties: `vin`, `color`, `make`, `model`, `year`, `weight`, `topSpeed`, `wheels: Wheel[]`; includes `popWheelie()`, overrides `printDetails()`.

- **`src/classes/Wheel.ts`**  
  Simple class modeling a wheel with `diameter` and `tireBrand`.

- **`src/interfaces/Driveable.ts`**  
  Interface defining driving capabilities: `started`, `currentSpeed`, `start()`, `accelerate()`, `decelerate()`, `stop()`, `turn()`, `reverse()`.

- **`src/classes/Cli.ts`**  
  Uses Inquirer to prompt users for creating/selecting vehicles and performing actions. Manages array of typed vehicles, persistence to `vehicles.json`, and driving flows.

- **`src/index.ts`**  
  Entry point: constructs an initial array of sample vehicles, then instantiates `Cli` with that list and calls `startCli()`.

- **`vehicles.json`**  
  Automatically created at runtime to save user-created vehicles. The CLI will read this file on start to reload any previously created vehicles.

---

## Classes & Interfaces

### Driveable (Interface)
```ts
export interface Driveable {
  started: boolean;
  currentSpeed: number;

  start(): void;
  accelerate(change: number): void;
  decelerate(change: number): void;
  stop(): void;
  turn(direction: string): void;
  reverse(): void;
}
```
Any class implementing `Driveable` must provide those properties and methods.

---

### Vehicle (Abstract Class)
```ts
export default abstract class Vehicle implements Driveable {
  started = false;
  currentSpeed = 0;

  constructor(public make: string, public model: string, public year: number, public weight: number) {}

  start(): void { /* … */ }
  accelerate(change: number): void { /* … */ }
  decelerate(change: number): void { /* … */ }
  stop(): void { /* … */ }
  turn(direction: string): void { /* … */ }
  reverse(): void { /* … */ }

  printDetails(): void { /* … */ }
}
```
Provides base functionality for all vehicle types.

---

### Car (Subclass)
```ts
export default class Car extends Vehicle {
  constructor(
    public vin: string,
    public color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    public topSpeed: number,
    public wheels: Wheel[]
  ) { super(make, model, year, weight); … }

  honk(): void { console.log("Beep beep!"); }

  override printDetails(): void { /* prints all car info and wheels */ }
}
```
- Unique method: `honk()`
- Overrides `printDetails()` to include `vin`, `color`, `topSpeed`, and each wheel’s specs.

---

### Truck (Subclass)
```ts
export default class Truck extends Vehicle implements AbleToTow {
  constructor(
    public vin: string,
    public color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    public topSpeed: number,
    public wheels: Wheel[],
    public towingCapacity: number
  ) { super(make, model, year, weight); }

  tow(vehicle: Vehicle): void { /* … */ }

  override printDetails(): void { /* prints all truck info, wheels, towingCapacity */ }
}
```
- Interface: `AbleToTow`
- Unique method: `tow(vehicle: Vehicle)`
- Overrides `printDetails()` to show towing capacity and wheels.

---

### Motorbike (Subclass)
```ts
export default class Motorbike extends Vehicle {
  constructor(
    public vin: string,
    public color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    public topSpeed: number,
    public wheels: Wheel[]
  ) { super(make, model, year, weight); }

  popWheelie(): void { console.log(`Motorbike ${this.make} ${this.model} pops a wheelie!`); }

  override printDetails(): void { /* prints motorbike info and 2 wheels */ }
}
```
- Unique method: `popWheelie()`
- Overrides `printDetails()` to show both wheels’ specs.

---

### Wheel
```ts
export default class Wheel {
  constructor(public diameter: number = 10, public tireBrand: string = "Generic") {}

  get getDiameter(): number { return this.diameter; }
  get getTireBrand(): string { return this.tireBrand; }
}
```
Models a wheel’s diameter and tire brand.

---

## Walkthrough Video

A demonstration of the CLI, showing:

1. **Launching** with `npm start`  
2. **Creating** a Car, a Truck, and a Motorbike (entering all required properties)  
3. **Performing** each action (including honk, tow, and wheelie)  
4. **Selecting** existing vehicles  
5. **Exiting** the application  

[Watch the Walkthrough Video](https://app.screencastify.com/v2/manage/videos/srGWbB1YOUFJh3U59gJW)


---

## License & Attribution

This code was adapted from the UCI Boot Camp TypeScript OOP starter project. All modifications were made to fulfill the Module 8 Challenge requirements.

---

> **Note:**  
> If you collaborated with others or used outside resources (e.g. Stack Overflow, tutorials), please add appropriate attributions here.
---

**End of README**  
