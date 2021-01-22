export class AirportsModel {
  public id: string;
  public aid: string;
  public name: string;
  public icao_code: string;
  public iata_code: string;
  public country: string;
  public country_code: string;
  public airport_category: string;
  public office_num: string;
  public mobile_num: string;
  public fax_num: string;
  public pic_name: string;
  public pic_num: string;
  public is_active: boolean;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    aid: string,
    name: string,
    icao_code: string,
    iata_code: string,
    country: string,
    country_code: string,
    airport_category: string,
    office_num: string,
    mobile_num: string,
    fax_num: string,
    pic_name: string,
    pic_num: string,
    is_active: boolean,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.aid = aid;
    this.name = name;
    this.icao_code = icao_code;
    this.iata_code = iata_code;
    this.country = country;
    this.country_code = country_code;
    this.airport_category = airport_category;
    this.office_num = office_num;
    this.mobile_num = mobile_num;
    this.fax_num = fax_num;
    this.pic_name = pic_name;
    this.pic_num = pic_num;
    this.is_active = is_active;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
