"use strict";
class Hotel {
    constructor(name, adress, stars) {
        this.name = name;
        this.adress = adress;
        this.stars = stars;
        this.rooms = [];
    }
    addRoom(room) {
        this.rooms.push(room);
    }
    printRooms(minComfort) {
        for (const room of this.rooms) {
            if (room.comfort > minComfort || minComfort === undefined) {
                console.log('--------KAMBARYS----------');
                room.printData();
            }
        }
    }
    printData(onlyComfort) {
        console.log(`Name: ${this.name}`);
        console.log(`Adress: ${this.adress}`);
        console.log(`${this.stars} stars`);
        const comfortLvl = 15;
        if (onlyComfort) {
            this.printRooms(comfortLvl);
        }
        else {
            this.printRooms();
        }
    }
}
class Room {
    constructor(size, capacity) {
        this.size = size;
        this.capacity = capacity;
    }
    get comfort() {
        return this.size / this.capacity;
    }
    printData() {
        console.log(`Kambario dydis: ${this.size} m2.`);
        console.log(`Asmenu kiekis: ${this.capacity} zmones.`);
        console.log(`Komforto lygis: ${this.comfort}.`);
    }
}
class Spa extends Room {
    constructor(size, capacity, poolSize, poolTemperature) {
        super(size, capacity);
        this.poolSize = poolSize;
        this.poolTemperature = poolTemperature;
    }
    get comfort() {
        return (this.size - this.poolSize) / this.capacity;
    }
    printData() {
        super.printData();
        console.log(`Baseino dydis: ${this.poolSize} m2.`);
        console.log(`Vandens temperatura: ${this.poolTemperature} C.`);
    }
}
const transylvania = new Hotel('Transylvania', 'Worms Eye 17', 5);
const UI = {
    roomSize: document.getElementById('size'),
    capacity: document.getElementById('capacity'),
    poolSize: document.getElementById('pool-size'),
    temperature: document.getElementById('water'),
    button: document.getElementById('button'),
};
UI.button.addEventListener('click', () => {
    const size = Number(UI.roomSize.value);
    const capacity = +(UI.capacity.value);
    const poolSize = +(UI.poolSize.value);
    const poolTemperature = +(UI.temperature.value);
    if (size === 0 ||
        capacity === 0) {
        console.error('ERROR: Cannot add Room without size or capacity');
        return;
    }
    if (size < 0 ||
        capacity < 0 ||
        poolSize < 0 ||
        poolTemperature < 0) {
        console.error('ERROR: parameter has to be a positive number');
        return;
    }
    if (poolSize === 0 ||
        poolTemperature === 0) {
        transylvania.addRoom(new Room(size, capacity));
    }
    else {
        transylvania.addRoom(new Spa(size, capacity, poolSize, poolTemperature));
    }
    transylvania.printData();
});
