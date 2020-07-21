export class RemindersModel {
  public id: string;
  public description: string;
  public operator: string;
  public invoice: string;
  public days: number;
  public status: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    description: string,
    operator: string,
    invoice: string,
    days: number,
    status: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.description = description;
    this.operator = operator;
    this.invoice = invoice;
    this.days = days;
    this.status = status;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
