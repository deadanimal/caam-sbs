export class AircraftsModel {
  public id: string;
  public description: string;
  public registration_num: string;
  public model: string;
  public manufacturer: string;
  public aircraft_type: string;
  public weight_category: string;
  public min_weight: number;
  public max_weight: number;
  public operator: number;
  public is_active: boolean;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    description: string,
    registration_num: string,
    model: string,
    manufacturer: string,
    aircraft_type: string,
    weight_category: string,
    min_weight: number,
    max_weight: number,
    operator: number,
    is_active: boolean,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.description = description;
    this.registration_num = registration_num;
    this.model = model;
    this.manufacturer = manufacturer;
    this.aircraft_type = aircraft_type;
    this.weight_category = weight_category;
    this.min_weight = min_weight;
    this.max_weight = max_weight;
    this.operator = operator;
    this.is_active = is_active;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
