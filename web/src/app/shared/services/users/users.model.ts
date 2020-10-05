export class UsersModel {
  public id: string;
  public full_name: string;
  public email: string;
  public mobile: string;
  public position: string;
  public department: string;
  public user_type: string;
  public organisation: string;
  // public profile_picture: any;
  public is_active: boolean;
  public date_joined: any;

  constructor(
    id: string,
    full_name: string,
    email: string,
    mobile: string,
    position: string,
    department: string,
    user_type: string,
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
    this.department = department;
    this.user_type = user_type;
    this.organisation = organisation;
    // this.profile_picture = profile_picture;
    this.is_active = is_active;
    this.date_joined = date_joined;
  }
}
