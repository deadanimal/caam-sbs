export class UploadsModel {
  public id: string;
  public name: string;
  public data_type: string;
  public data_file_link: string;
  public uploaded_by: string;
  public file_type: string;
  public total_data: number;
  public status: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    name: string,
    data_type: string,
    data_file_link: string,
    uploaded_by: string,
    file_type: string,
    total_data: number,
    status: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.name = name;
    this.data_type = data_type;
    this.data_file_link = data_file_link;
    this.uploaded_by = uploaded_by;
    this.file_type = file_type;
    this.total_data = total_data;
    this.status = status;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
