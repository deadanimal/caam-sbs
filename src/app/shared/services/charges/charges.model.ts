export class ChargesModel {
  public id: string;
  public rate: string;
  public aircraft: string;
  public charge_rate: number;
  public charge_minimum: number;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    rate: string,
    aircraft: string,
    charge_rate: number,
    charge_minimum: number,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.rate = rate;
    this.aircraft = aircraft;
    this.charge_rate = charge_rate;
    this.charge_minimum = charge_minimum;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
