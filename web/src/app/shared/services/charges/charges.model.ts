export class ChargesModel {
  public id: string;
  public name: string;
  public rate_id: string;
  public aircraft: string;
  public charge_rate: number;
  public charge_min: number;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    name: string,
    rate_id: string,
    aircraft: string,
    charge_rate: number,
    charge_min: number,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.name = name;
    this.rate_id = rate_id;
    this.aircraft = aircraft;
    this.charge_rate = charge_rate;
    this.charge_min = charge_min;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
