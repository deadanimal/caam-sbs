export class ReceiptsModel {
  public id: string;
  public payment: string;
  public uploaded_data: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    payment: string,
    uploaded_data: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.payment = payment;
    this.uploaded_data = uploaded_data;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
