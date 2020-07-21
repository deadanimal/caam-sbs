export class UsersModel {
  public id: string;
  public full_name: string;
  public mobile: string;
  public position: string;
  public department: string;
  public user_type: string;
  public organisation: string;
  // public profile_picture: any;

  constructor(
    id: string,
    full_name: string,
    mobile: string,
    position: string,
    department: string,
    user_type: string,
    organisation: string
    // public profile_picture: any,
  ) {
    this.id = id;
    this.full_name = full_name;
    this.mobile = mobile;
    this.position = position;
    this.department = department;
    this.user_type = user_type;
    this.organisation = organisation;
    // // this.profile_picture = profile_picture;
  }
}
