export class OrganisationsModel {
  public id: string;
  public name: string;
  public shortname: string;
  public cid: string;
  public is_active: boolean;
  public organisation_type: string;
  public email_1: string;
  public email_2: string;
  public email_3: string;
  public email_4: string;
  public office_num: string;
  public mobile_num: string;
  public fax_number: string;
  public pic_name: string;
  public pic_num: string;
  public address_line_1: string;
  public address_line_2: string;
  public address_line_3: string;
  public postcode: string;
  public city: string;
  public state: string;
  public country: string;
  public created_at: any;
  public modified_at: any;

  constructor(
    id: string,
    name: string,
    shortname: string,
    cid: string,
    is_active: boolean,
    organisation_type: string,
    email_1: string,
    email_2: string,
    email_3: string,
    email_4: string,
    office_num: string,
    mobile_num: string,
    fax_number: string,
    pic_name: string,
    pic_num: string,
    address_line_1: string,
    address_line_2: string,
    address_line_3: string,
    postcode: string,
    city: string,
    state: string,
    country: string,
    created_at: any,
    modified_at: any
  ) {
    this.id = id;
    this.name = name;
    this.shortname = shortname;
    this.cid = cid;
    this.is_active = is_active;
    this.organisation_type = organisation_type;
    this.email_1 = email_1;
    this.email_2 = email_2;
    this.email_3 = email_3;
    this.email_4 = email_4;
    this.office_num = office_num;
    this.mobile_num = mobile_num;
    this.fax_number = fax_number;
    this.pic_name = pic_name;
    this.pic_num = pic_num;
    this.address_line_1 = address_line_1;
    this.address_line_2 = address_line_2;
    this.address_line_3 = address_line_3;
    this.postcode = postcode;
    this.city = city;
    this.state = state;
    this.country = country;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
