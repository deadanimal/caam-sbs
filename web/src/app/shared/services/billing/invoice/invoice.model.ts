
export class Invoice {

  public id: string;
  public invoicenumber: string;
  public invoicedate: any;
  public invoiceperiod: string;
  public amount: number;
  public status: string;

  constructor(
    id: string,
    invoicenumber: string,
    invoicedate: any,
    invoiceperiod: string,
    amount: number,
    status: string,


  ) {
    this.id = id;
    this.invoicenumber = invoicenumber;
    this.invoicedate = invoicedate;
    this.invoiceperiod = invoiceperiod;
    this.amount = amount;
    this.status = status;

  }
}
