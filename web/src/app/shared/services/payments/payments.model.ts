export class PaymentsModel {
  public id: string;
  public invoice: string;
  public amount_paid: number;
  public debit_note: number;
  public credit_note: number;
  public payment_method: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    invoice: string,
    amount_paid: number,
    debit_note: number,
    credit_note: number,
    payment_method: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.invoice = invoice;
    this.amount_paid = amount_paid;
    this.debit_note = debit_note;
    this.credit_note = credit_note;
    this.payment_method = payment_method;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
