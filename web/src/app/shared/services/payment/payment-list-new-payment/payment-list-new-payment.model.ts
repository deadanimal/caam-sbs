
export class PaymentListNewPayment {
  public id: string;
  public cid: string;
  public companyname: string;
  public date: any;
  public paymentmethod: string;
  public payementamount: number;
  public receivemount: number;

  constructor(
    id: string,
    cid: string,
    companyname: string,
    date: any,
    paymentmethod: string,
    payementamount: number,


  ) {
    this.id = id;
    this.cid = cid;
    this.companyname= companyname;
    this.date = date;
    this.paymentmethod = paymentmethod;
    this.payementamount= payementamount;

  }
}
