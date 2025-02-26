// TODO: The Truck class should extend the Vehicle class and should implement the AbleToTow interface
class Truck {
    // TODO: Declare properties of the Truck class
    // TODO: The properties should include vin, color, make, model, year, weight, top speed, wheels, and towing capacity
    // TODO: The types should be as follows: vin (string), color (string), make (string), model (string), year (number), weight (number), topSpeed (number), wheels (Wheel[]), towingCapacity (number)
    // TODO: Create a constructor that accepts the properties of the Truck class
    // TODO: The constructor should call the constructor of the parent class, Vehicle
    // TODO: The constructor should initialize the properties of the Truck class
    // TODO: The constructor should check if the wheels array has 4 elements and create 4 new default Wheel objects if it does not
    // TODO: Implement the tow method from the AbleToTow interface
    tow(vehicle) {
        // TODO: Get the make an model of the vehicle if it exists
        // TODO: Check if the vehicle's weight is less than or equal to the truck's towing capacity
        // TODO: If it is, log that the vehicle is being towed
        // TODO: If it is not, log that the vehicle is too heavy to be towed
    }
}
// Export the Truck class as the default export
export default Truck;
