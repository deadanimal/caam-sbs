export class UploadsModel {
  public id: string;
  public name: string;
  public data_type: string;
  public document_url: any;
  // public model: string;
  // public operator: string;
  public uploaded_by: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    name: string,
    data_type: string,
    document_url: any,
    // model: string,
    // operator: string,
    uploaded_by: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.name = name;
    this.data_type = data_type;
    this.document_url = document_url;
    // this.model = model;
    // this.operator = operator;
    this.uploaded_by = uploaded_by;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
