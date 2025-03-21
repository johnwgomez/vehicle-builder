import Vehicle from './Vehicle.js'; // Import Vehicle class

// TODO: The Motorbike class should extend the Vehicle class
class Motorbike extends Vehicle { // Extend Motorbike from Vehicle
    constructor(make, model, year) {
        super(make, model, year); // Call parent constructor
    }
}

// Export the Motorbike class as the default export
export default Motorbike;
