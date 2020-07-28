export class UploadsModel {
  public id: string;
  public name: string;
  public data_type: string;
  public data_file_link: string;
  public route: string;
  public operator: string;
  public aircraft: string;
  public charge: string;
  public flight_rule: string;
  public remarks: string;
  public touchdown: number;
  public approval_permit_num: string;
  public uploaded_by: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    name: string,
    data_type: string,
    data_file_link: string,
    route: string,
    operator: string,
    aircraft: string,
    charge: string,
    flight_rule: string,
    remarks: string,
    touchdown: number,
    approval_permit_num: string,
    uploaded_by: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.name = name;
    this.data_type = data_type;
    this.data_file_link = data_file_link;
    this.route = route;
    this.operator = operator;
    this.aircraft = aircraft;
    this.charge = charge;
    this.flight_rule = flight_rule;
    this.remarks = remarks;
    this.touchdown = touchdown;
    this.approval_permit_num = approval_permit_num;
    this.uploaded_by = uploaded_by;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
