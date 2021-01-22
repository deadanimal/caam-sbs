export class RatesModel {
  public id: string;
  public name: string;
  public lower_weight_limit: string;
  public upper_weight_limit: string;
  public rate: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    name: string,
    lower_weight_limit: string,
    upper_weight_limit: string,
    rate: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.name = name;
    this.lower_weight_limit = lower_weight_limit;
    this.upper_weight_limit = upper_weight_limit;
    this.rate = rate;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
