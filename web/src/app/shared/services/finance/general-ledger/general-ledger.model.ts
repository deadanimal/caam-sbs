
export class GeneralLedger {

  public id: string;
  public activitydate: any;
  public activity: string;
  public cid: string;
  public companyname: string;
  public transactioncode: string;
  public transactionaccount: string;
  public amount: number;
  public debit: number;
  public credit: number;
  public total: number;


  constructor(
    id: string,
    activitydate: any,
    activity: string,
    cid: string,
    companyname: string,
    transactioncode: string,
    transactionaccount: string,
    amount: number,
    debit: number,
    credit: number,
    total: number,
  ) {
    this.id = id;
    this.activitydate = activitydate;
    this.activity = activity;
    this.cid = cid;
    this.companyname = companyname;
    this.transactioncode = transactioncode;
    this.transactionaccount = transactionaccount;
    this.amount = amount;
    this.debit = debit;
    this.credit = credit;
    this.total = total;
  }
}
