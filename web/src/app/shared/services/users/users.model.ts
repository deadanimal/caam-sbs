export class UsersModel {
  public id: string;
  public full_name: string;
  public email: string;
  public mobile: string;
  public position: string;
  public user_type: string;
  // public profile_picture: any;
  public organisation: string;
  public department: string;
  public company_name: string;
  public office_num: string;
  public is_active: boolean;
  public date_joined: any;

  constructor(
    id: string,
    full_name: string,
    email: string,
    mobile: string,
    position: string,
    user_type: string,
    department: string,
    company_name: string,
    office_num: string,
    organisation: string,
    // profile_picture: any,
    is_active: boolean,
    date_joined: any,
  ) {
    this.id = id;
    this.full_name = full_name;
    this.email = email;
    this.mobile = mobile;
    this.position = position;
    this.user_type = user_type;
    this.department = department;
    this.company_name = company_name;
    this.office_num = office_num;
    this.organisation = organisation;
    // this.profile_picture = profile_picture;
    this.is_active = is_active;
    this.date_joined = date_joined;
  }
}
