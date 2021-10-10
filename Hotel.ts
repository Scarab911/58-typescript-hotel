// import { Room } from "./Room";

class Hotel {
    public readonly name: string;
    public readonly adress: string;
    public readonly stars: number;
    public rooms: {}[];

    public constructor(name: string,
                 adress: string,
                 stars: number){

        this.name = name;
        this.adress = adress;
        this.stars = stars;
        this.rooms = [];
    }

    //spausdinam Hotel info i konsole:
    public printData(onlyComfort?: boolean): void {
        if(!onlyComfort){
            console.log(' ');
        } else {
            console.log(`Name: ${this.name}`);
            console.log(`Adress: ${this.adress}`);
            console.log(`${this.stars} stars`);
        }
    }

    // pridedam kambary i masyva:
    addRoom(room: Room): void {
        this.rooms.push(room);
    }

    //spausdinam kambarius
    public printRooms(minComfort?: number): void {
        this.printData(false)
        console.log(this.rooms);
        
    }

}

class Room {
    size: number;
    capacity: number;

    public constructor(size: number, capacity: number){
      this.size = size;
      this.capacity = capacity;
    }

    //paskaiciuojam komforto santykį, kiek patalpoje vienam žmogui tenka erdvės.
   get comfort(): number {
        return this.size/this.capacity;
    }

    //spausdinam Room info:
    public printData(onlyComfort?: boolean): void {
        console.log(`Kambario dydis: ${this.size} m2.`);
        console.log(`Asmenu kiekis: ${this.capacity} zmones.`);
        console.log(`Komforto lygis: ${this.comfort}.`);
        
    }
}

class Spa extends Room {
    poolSize: number;
    poolTemperature: number;
    
    constructor(poolSize: number,
                poolTemperature: number){
        super(40, 2)
        this.poolSize = poolSize;
        this.poolTemperature = poolTemperature;
    }
     
    //paskaiciuojam komforto santykį, kiek patalpoje vienam žmogui tenka erdvės.
    get comfort(): number {
        return (this.size - this.poolSize)/this.capacity;
    }

    //spausdinam Spa info:
    public printData(onlyComfort?: boolean): void {
       super.printData();
       console.log(`Baseino dydis: ${this.poolSize} m2.`);
       console.log(`Vandens temperatura: ${this.poolTemperature} C.`);
       
    }
}

//sukuriam viesbuti
const transylvania = new Hotel('Transylvania', 'Worms Eye 17', 5);

//spausdinam viesbucio info
transylvania.printData(true);

//pridedam kambarius
transylvania.addRoom(new Room(30,2));
transylvania.addRoom(new Room(20,1));
transylvania.addRoom(new Room(100,5));
console.log('************');

console.log('Viesbutyje esantys kambariai:')
transylvania.printRooms()

const dvivietis = new Room(20,2)
console.log('Dvivietis:', dvivietis);
dvivietis.printData()

const spaRoom = new Spa(5,20)
console.log('SPA Room:', spaRoom);
spaRoom.printData()
