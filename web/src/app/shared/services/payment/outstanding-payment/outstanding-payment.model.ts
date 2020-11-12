
export class OutstandingPayement {
  public id: string;
  public cid: string;
  public companyname: string;
  public totalamount: number;
  public file: any;

  constructor(
    id: string,
    cid: string,
    companyname: string,
    totalamount: number,
    file: any,

  ) {
    this.id = id;
    this.cid = cid;
    this.companyname= companyname;
    this.totalamount = totalamount;
    this.file = file;
  }
}
