
function Car(carMake, carSpeed){
    
    this.carMake = carMake;
    this.carSpeed = carSpeed;

}
Car.prototype.accelerate = function ()  {

    this.carSpeed += 10;
    console.log(`The car is moving with speed of ${this.carSpeed} km/h`);

}
Car.prototype.brake = function () {
    
    this.carSpeed -= 5;
    console.log(`The car is moving with speed of ${this.carSpeed} km/h`);

}

const car1 = new Car("BMW", 120);
const car2 = new Car("Mercedes", 95);

console.log(car1);
car1.accelerate();
car1.brake();
car1.accelerate();
console.log(car2);