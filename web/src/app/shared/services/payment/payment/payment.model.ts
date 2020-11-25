
export class Payment {
  public id: string;
  public cid: string;
  public company_name: string;
  public online: boolean;
  public approved: boolean;
  public created_at: any;
  public modified_at: any;
  public code: string;
  public payment_method: string;
  public remark: string;
  public attachment: any;
  public amount_receive: number;
  public summary: string;
  

  constructor(
    id: string,
    cid: string,
    company_name: string,
    online: boolean,
    approved: boolean,
    created_at: any,
    modified_at: any,
    code: string,
    payment_method: string,
    remark: string,
    attachment: any,
    amount_receive: number,
    summary: string,
  ) {
    this.id = id;
    this.cid = cid;
    this.company_name = company_name;
    this.online = online;
    this.approved = approved;
    this.created_at = created_at;
    this.modified_at = modified_at;
    this.code = code;
    this.payment_method = payment_method;
    this.remark = remark;
    this.attachment = attachment;
    this.amount_receive = amount_receive;
    this.summary = summary;
  }
}
