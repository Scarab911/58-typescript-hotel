
class Hotel {
    public readonly name: string;
    public readonly adress: string;
    public readonly stars: number;
    public rooms: Room[];

    public constructor(name: string,
                 adress: string,
                 stars: number){

        this.name = name;
        this.adress = adress;
        this.stars = stars;
        this.rooms = [];
    }

    // pridedam kambary i masyva:
    public addRoom(room: Room): void {
        this.rooms.push(room);
    }
    
    //spausdinam kambarius
    private printRooms(element: HTMLElement, minComfort?: number): void {
       for (const room of this.rooms){

          if (room.comfort > minComfort || minComfort === undefined) {
              console.log('--------KAMBARYS----------');
              room.printData(element);
          }
       }   
    }

    //spausdinam Hotel info i konsole:
    public printData(element: HTMLElement, onlyComfort?: boolean): void {
        console.log(`Name: ${this.name}`);
        console.log(`Adress: ${this.adress}`);
        console.log(`${this.stars} stars`);
        
        // const comfortLvl = 15;

        // if (onlyComfort) {
        //     this.printRooms(comfortLvl);
        // } else {
        //     this.printRooms();
        // }
        this.printRooms(element)
    }
}

class Room {
    public readonly size: number;
    public readonly capacity: number;

    public constructor(size: number, capacity: number){
      this.size = size;
      this.capacity = capacity;
    }

    //paskaiciuojam komforto santykį, kiek patalpoje vienam žmogui tenka erdvės.
   get comfort(): number {
        return this.size/this.capacity;
    }

    //spausdinam Room info:
    public printData(element: HTMLElement): void {
        console.log(`Kambario dydis: ${this.size} m2.`);
        console.log(`Asmenu kiekis: ${this.capacity} zmones.`);
        console.log(`Komforto lygis: ${this.comfort}.`);

        element.innerHTML += `<div class="card">
                                <h3 class="room-name">Kambarys</h3>
                                <p class="room-size">Room size: ${this.size} m2</p>
                                <p class="capacity">Capacity: ${this.capacity} persons</p>
                            </div>`
    }
}

class Spa extends Room {
    public poolSize: number;
    public poolTemperature: number;
    
    constructor(size: number,
                capacity: number,
                poolSize: number,
                poolTemperature: number){
        super(size, capacity)
        this.poolSize = poolSize;
        this.poolTemperature = poolTemperature;
    }
     
    //paskaiciuojam komforto santykį, kiek patalpoje vienam žmogui tenka erdvės.
    get comfort(): number {
        return (this.size - this.poolSize)/this.capacity;
    }

    //spausdinam Spa Kambario info:
    public printData(element: HTMLElement): void {

        element.innerHTML += `<div class="card">
                            <h3 class="room-name">Kambarys</h3>
                            <p class="room-size">Room size: ${this.size} m2</p>
                            <p class="capacity">Capacity: ${this.capacity} persons</p>
                            <p class="pool-size">Pool size: ${this.poolSize} m2</p>
                            <p class="water-temperature">Water ${this.poolTemperature} temperature: C</p>
                        </div>`
    }
}

//EXECUTION BELOW

// //sukuriam viesbuti
const transylvania = new Hotel('Transylvania', 'Worms Eye 17', 5);

// //pridedam kambarius
// transylvania.addRoom(new Room(30, 2));
// transylvania.addRoom(new Room(25, 4));
// transylvania.addRoom(new Spa(40, 2, 5, 18));

// //spausdinam viesbucio info
// transylvania.printData();

// console.log(`*********************`);
// console.log(`tik COMFORT:`);
// console.log(`*********************`);

// //spausdinam viesbucio info bet tik su kambariais kuriu
// //Komfortas > 15
// transylvania.printData(true);

const UI = {
    roomSize: document.getElementById('size') as HTMLInputElement,
    capacity: document.getElementById('capacity') as HTMLInputElement,
    poolSize: document.getElementById('pool-size') as HTMLInputElement,
    temperature: document.getElementById('water') as HTMLInputElement,
    button: document.getElementById('button') as HTMLInputElement,
    cardsContainer: document.querySelector<HTMLDivElement>('.output'),
}

//adding event listener to button to gather data from inputs 
UI.button.addEventListener('click', () => {
    const size = Number(UI.roomSize.value); //pakeiciam tipa su number()
    const capacity = +(UI.capacity.value);// arba su +
    const poolSize = +(UI.poolSize.value);
    const poolTemperature = +(UI.temperature.value);

    //Validations
    if(size === 0 ||
        capacity === 0 ||
        size  <= poolSize){
            console.error('ERROR: Cannot add Room without size or capacity or pool bigger than room size');
            return
    }

    if (size < 0 ||
        capacity < 0 ||
        poolSize < 0 ||
        poolTemperature < 0) {
        console.error('ERROR: parameter has to be a positive number');
        return
    }

    if (poolSize === 0 ||
        poolTemperature === 0) {
        
        transylvania.addRoom(new Room(size, capacity));
    } else {
        transylvania.addRoom(new Spa(size, capacity, poolSize, poolTemperature));
    }
    //Render Room Card
    render(); 
});


function render(): void {
    UI.cardsContainer.innerHTML = '';
    transylvania.printData(UI.cardsContainer)
}

