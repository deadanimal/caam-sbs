
export class DepositList {
  public id: string;
  public cid: string;
  public companyname: string;
  public depositamount: number;

  constructor(
    id: string,
    cid: string,
    companyname: string,
    depositamount: number,

  ) {
    this.id = id;
    this.cid = cid;
    this.companyname= companyname;
    this.depositamount = depositamount;
  }
}
