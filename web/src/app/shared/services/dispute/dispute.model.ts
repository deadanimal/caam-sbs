export class DisputeModel {
  public id: string;
  public dispute_no: string;
  public cid: string;
  public status: string;
  public remark: string;
  public created_at_str: string;
  public company_name: string;
  public fpls: [];

  constructor(
    id: string,
    dispute_no: string,
    cid: string,
    status: string,
    remark: string,
    created_at_str: string,
    company_name: string,
    fpls: [],

  ) {
    this.id = id;
    this.dispute_no = dispute_no;
    this.cid = cid;
    this.status = status;
    this.remark = remark;
    this.created_at_str = created_at_str;
    this.company_name = company_name;
    this.fpls = fpls;
    }
     
}
