export class RoutesModel {
  public id: string;
  public name: string;
  public description: string;
  public rtid: string;
  public distance: number;
  public location_departure: string;
  public location_destination: string;
  public total_distance: string;
  public flight_type: string;
  public category_type: string;
  public site: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    name: string,
    description: string,
    rtid: string,
    distance: number,
    location_departure: string,
    location_destination: string,
    total_distance: string,
    flight_type: string,
    category_type: string,
    site: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rtid = rtid;
    this.distance = distance;
    this.location_departure = location_departure;
    this.location_destination = location_destination;
    this.total_distance = total_distance;
    this.flight_type = flight_type;
    this.category_type = category_type;
    this.site = site;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
