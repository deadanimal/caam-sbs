
export class CreditDebit {

  public id: string;
  public cid: string;
  public companyname: string;
  public transaction: number;
  public transactionnumber: number;
  public transactiondate: any;
  public invoicenumber: string;
  public amount: number;


  constructor(
    id: string,
    cid: string,
    companyname: string,
    transaction: number,
    transactionnumber: number,
    transactiondate: any,
    invoicenumber: string,
    amount: number,
  ) {
    this.id = id;
    this.cid = cid;
    this.companyname = companyname;
    this.transaction = transaction;
    this.transactionnumber = transactionnumber;
    this.transactiondate = transactiondate;
    this.invoicenumber = invoicenumber;
    this.amount = amount;

  }
}
