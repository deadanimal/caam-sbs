export class FpldatasHistoryModel {
  public id: string;
  public master_data_id: string;
  public reason: string;
  public remark: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    master_data_id: string,
    reason: string,
    remark: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.reason = reason;
    this.remark = remark;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
