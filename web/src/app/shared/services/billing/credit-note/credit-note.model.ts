
export class CreditNote {

  public id: string;
  public creditnote: string;
  public invoicenote: string;
  public issuedate: any;
  public amount: number;

  constructor(
    id: string,
    creditnote: string,
    invoicenote: string,
    issuedate: any,
    amount: number,


  ) {
    this.id = id;
    this.creditnote = creditnote;
    this.invoicenote = invoicenote;
    this.issuedate = issuedate;
    this.amount = amount;

  }
}
