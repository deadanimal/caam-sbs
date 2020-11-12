
export class TflVfr {
  public id: string;
  public uploaddate: any;
  public filename: string;
  public filedate: any;
  public totaldata: number;
  public status: string;
  public attachment: any;

  constructor(
    id: string,
    uploaddate: any,
    filename: string,
    filedate: any,
    totaldata: number,
    status: string,
    attachment: any,

  ) {
    this.id = id;
    this.uploaddate = uploaddate;
    this.filename = filename;
    this.filedate = filedate;
    this.totaldata = totaldata;
    this.status = status;
    this.attachment= attachment;
  }
}

