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
    printRooms(element, minComfort) {
        for (const room of this.rooms) {
            if (room.comfort > minComfort || minComfort === undefined) {
                console.log('--------KAMBARYS----------');
                room.printData(element);
            }
        }
    }
    printData(element, onlyComfort) {
        console.log(`Name: ${this.name}`);
        console.log(`Adress: ${this.adress}`);
        console.log(`${this.stars} stars`);
        this.printRooms(element);
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
    printData(element) {
        console.log(`Kambario dydis: ${this.size} m2.`);
        console.log(`Asmenu kiekis: ${this.capacity} zmones.`);
        console.log(`Komforto lygis: ${this.comfort}.`);
        element.innerHTML += `<div class="card">
                                <h3 class="room-name">Kambarys</h3>
                                <p class="room-size">Room size: ${this.size} m2</p>
                                <p class="capacity">Capacity: ${this.capacity} persons</p>
                            </div>`;
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
    printData(element) {
        element.innerHTML += `<div class="card">
                            <h3 class="room-name">Kambarys</h3>
                            <p class="room-size">Room size: ${this.size} m2</p>
                            <p class="capacity">Capacity: ${this.capacity} persons</p>
                            <p class="pool-size">Pool size: ${this.poolSize} m2</p>
                            <p class="water-temperature">Water ${this.poolTemperature} temperature: C</p>
                        </div>`;
    }
}
const transylvania = new Hotel('Transylvania', 'Worms Eye 17', 5);
const UI = {
    roomSize: document.getElementById('size'),
    capacity: document.getElementById('capacity'),
    poolSize: document.getElementById('pool-size'),
    temperature: document.getElementById('water'),
    button: document.getElementById('button'),
    cardsContainer: document.querySelector('.output'),
};
UI.button.addEventListener('click', () => {
    const size = Number(UI.roomSize.value);
    const capacity = +(UI.capacity.value);
    const poolSize = +(UI.poolSize.value);
    const poolTemperature = +(UI.temperature.value);
    if (size === 0 ||
        capacity === 0 ||
        size <= poolSize) {
        console.error('ERROR: Cannot add Room without size or capacity or pool bigger than room size');
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
    render();
});
function render() {
    UI.cardsContainer.innerHTML = '';
    transylvania.printData(UI.cardsContainer);
}
