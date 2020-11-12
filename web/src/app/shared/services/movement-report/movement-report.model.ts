
export class MovementReport{

  public id: string;
  public datetime: any;
  public callsign: string;
  public type: string;
  public departure: any;
  public destination: string;
  public ctg: string;
  public distance: number;
  public route: string;



  constructor(
    id: string,
    datetime: any,
    callsign: string,
    type: string,
    departure: any,
    destination: string,
    ctg: string,
    distance: number,
    route: string,


  ) {
    this.id = id;
    this.datetime= datetime,
    this.callsign= callsign,
    this.type= type,
    this.departure= departure,
    this.destination= destination,
    this.ctg= ctg,
    this.distance= distance,
    this.route= route

  }
}
