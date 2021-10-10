
class Hotel {
    public name: string;
    public adress: string;
    public stars: number;
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
    addRoom(room: Room): void {
        this.rooms.push(room);
    }
    
    //spausdinam kambarius
    private printRooms(minComfort?: number): void {
       for (const room of this.rooms){
           
           if (minComfort !== undefined){

               if (room.comfort > minComfort) {
                   room.printData()
               }
           } else {
               room.printData()
           }
       }   
    }

    //spausdinam Hotel info i konsole:
    public printData(onlyComfort?: boolean): void {
        console.log(`Name: ${this.name}`);
        console.log(`Adress: ${this.adress}`);
        console.log(`${this.stars} stars`);

        if (onlyComfort) {
            this.printRooms(15);
        } else {
            this.printRooms();
        }
    }
}

class Room {
    public size: number;
    public capacity: number;

    public constructor(size: number, capacity: number){
      this.size = size;
      this.capacity = capacity;
    }

    //paskaiciuojam komforto santykį, kiek patalpoje vienam žmogui tenka erdvės.
   get comfort(): number {
        return this.size/this.capacity;
    }

    //spausdinam Room info:
    public printData(): void {
        console.log('------');
        console.log(`Kambario dydis: ${this.size} m2.`);
        console.log(`Asmenu kiekis: ${this.capacity} zmones.`);
        console.log(`Komforto lygis: ${this.comfort}.`);
        
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

    //spausdinam Spa info:
    public printData(): void {
       super.printData();
       console.log(`Baseino dydis: ${this.poolSize} m2.`);
       console.log(`Vandens temperatura: ${this.poolTemperature} C.`);
       
    }
}

//sukuriam viesbuti
const transylvania = new Hotel('Transylvania', 'Worms Eye 17', 5);

//pridedam kambarius
transylvania.addRoom(new Room(30, 2));
transylvania.addRoom(new Room(25, 4));
// transylvania.addRoom(new Room(100, 5));
transylvania.addRoom(new Spa(40, 2, 5, 18));


//spausdinam viesbucio info
transylvania.printData();

console.log(`*********************`);
console.log(`tik COMFORT:`);
console.log(`*********************`);

transylvania.printData(true);

// const dvivietis = new Room(20,2)
// dvivietis.printData()

// const spaRoom = new Spa(5,20)
// spaRoom.printData()
