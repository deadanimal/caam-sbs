export class CallsignsModel {
  public id: string;
  public callsign: string;
  public cid: string;
  public callsign_type: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    callsign: string,
    cid: string,
    callsign_type: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.callsign = callsign;
    this.cid = cid;
    this.callsign_type = callsign_type;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
