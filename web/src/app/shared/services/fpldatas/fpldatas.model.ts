export class FpldatasModel {
  public id: string;
  public invoice_no: string;
  public invoice_period: string;
  public status: string;
  public remark: string;
  public reason: string;
  public cid: string;
  public ctg: string;
  public fpl_date: string;
  public fpl_no: string;
  public aircraft_model: string;
  public dep: string;
  public dest: string;
  public route: string;
  public rate: number;
  public dist: number;
  public amount: number;
  public error_remark: string;
  public uploaded_by: string;
  public fileupload_id: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    invoice_no: string,
    invoice_period: string,
    status: string,
    remark: string,
    reason: string,
    cid: string,
    ctg: string,
    fpl_date: string,
    fpl_no: string,
    aircraft_model: string,
    dep: string,
    dest: string,
    route: string,
    rate: number,
    dist: number,
    amount: number,
    error_remark: string,
    uploaded_by: string,
    fileupload_id: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.invoice_no = invoice_no;
    this.invoice_period = invoice_period;
    this.status = status;
    this.remark = remark;
    this.reason = reason;
    this.cid = cid;
    this.ctg = ctg;
    this.fpl_date = fpl_date;
    this.fpl_no = fpl_no;
    this.aircraft_model = aircraft_model;
    this.dep = dep;
    this.dest = dest;
    this.route = route;
    this.rate = rate;
    this.dist = dist;
    this.amount = amount;
    this.error_remark = error_remark;
    this.uploaded_by = uploaded_by;
    this.fileupload_id = fileupload_id;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
