export class ApprovalsModel {
  public id: string;
  public name: string;
  public type: string;
  public description: string;
  public status: string;
  public json_data: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    name: string,
    type: string,
    description: string,
    status: string,
    json_data: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.status = status;
    this.json_data = json_data;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
