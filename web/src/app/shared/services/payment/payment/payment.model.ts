
export class Payment {
  public id: string;
  public date: any;
  public amount: number;
  public status: string;
  public summary: number;
  public remark: string;
  public paymentmethod: string;
  public attachment: any;


  constructor(
    id: string,
    date: any,
    amount: number,
    status: string,
    summary: number,
    remark: string,
    paymentmethod: string,
    attachment: any,
  ) {
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.status = status;
    this.summary = summary;
    this.remark = remark;
    this.paymentmethod = paymentmethod;
    this.attachment = attachment;
  }
}
