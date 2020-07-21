export class InvoicesModel {
  public id: string;
  public uploaded_data: string;
  public amount: number;
  public debit_note: number;
  public credit_note: number;
  public total_amount: number;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    uploaded_data: string,
    amount: number,
    debit_note: number,
    credit_note: number,
    total_amount: number,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.uploaded_data = uploaded_data;
    this.amount = amount;
    this.debit_note = debit_note;
    this.credit_note = credit_note;
    this.total_amount = total_amount;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
