
export class Invoice {
  public id: string;
  public invoicenumber: string;
  public cid: string;
  public companyname: string;
  public invoicedate: any;
  public amount: number;
  public status: string;


  constructor(
    id: string,
    invoicenumber: string,
    cid: string,
    companyname: string,
    invoicedate: any,
    amount: number,
    status: string,
  ) {
    this.id = id;
    this.invoicenumber = invoicenumber;
    this.cid = cid;
    this.companyname = companyname;
    this.invoicedate = invoicedate;
    this.amount = amount;
    this.status = status;
    
  }
}
