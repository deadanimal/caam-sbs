
export class FlightData {
  public id: string;
  public datetime: any;
  public callsign: string;
  public type: string;
  public departure: string;
  public destination: string;
  public ctg: string;
  public distance: number;
  public route: string;
  public error: boolean;
  public reason: string;

  constructor(
    id: string,
    datetime: any,
    callsign: string,
    type: string,
    departure: string,
    destination: string,
    ctg: string,
    distance: number,
    route: string,
    error: boolean,
    reason: string,

  ) {
    this.id = id;
    this.datetime = datetime;
    this.callsign = callsign;
    this.type = type;
    this.departure = departure;
    this.destination = destination;
    this.ctg = ctg;
    this.distance = distance;
    this.route = route;
    this.error = error;
    this.reason = reason;
  }
}
