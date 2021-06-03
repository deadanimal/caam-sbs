
export class DebitNote {

  public id: string;
  public debitnote: string;
  public invoicenote: string;
  public issuedate: any;
  public amount: number;

  constructor(
    id: string,
    debitnote: string,
    invoicenote: string,
    issuedate: any,
    amount: number,


  ) {
    this.id = id;
    this.debitnote = debitnote;
    this.invoicenote = invoicenote;
    this.issuedate = issuedate;
    this.amount = amount;

  }
}
