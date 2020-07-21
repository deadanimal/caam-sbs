export class CallsignsModel {
  public id: string;
  public callsign: string;
  public cid: string;
  public aircraft: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    callsign: string,
    cid: string,
    aircraft: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.callsign = callsign;
    this.cid = cid;
    this.aircraft = aircraft;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
