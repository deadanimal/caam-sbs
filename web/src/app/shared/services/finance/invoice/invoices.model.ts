
// export class Invoice {
//   public id: string;
//   public invoicenumber: string;
//   public cid: string;
//   public companyname: string;
//   public invoicedate: any;
//   public amount: number;
//   public status: string;


//   constructor(
//     id: string,
//     invoicenumber: string,
//     cid: string,
//     companyname: string,
//     invoicedate: any,
//     amount: number,
//     status: string,
//   ) {
//     this.id = id;
//     this.invoicenumber = invoicenumber;
//     this.cid = cid;
//     this.companyname = companyname;
//     this.invoicedate = invoicedate;
//     this.amount = amount;
//     this.status = status;
    
//   }
// }

export class Invoice {
  public id: string;
  public invoice_no: string;
  public company_name: string;
  public company_address: string;
  public company_email: string;
  public office_num: string;
  public fax_number: string; 
  public status: string;
  public created_at: any;
  public created_at_str: string;
  public due_at: any;
  public due_at_str: string;
  public domestic_flight: number;
  public inbound_flight: number;
  public outbound_flight: number;
  public over_flight: number;
  public other_flight: number;
  public sub_total: number;
  public surcharge: number;
  public invoice_total: number;
  public cid: string;

  constructor(
    id: string,
    invoice_no: string,
    company_name: string,
    company_address: string,
    company_email: string,
    office_num: string,
    fax_number: string, 
    status: string,
    created_at: any,
    created_at_str: string,
    due_at: any,
    due_at_str: string,
    domestic_flight: number,
    inbound_flight: number,
    outbound_flight: number,
    over_flight: number,
    other_flight: number,
    sub_total: number,
    surcharge: number,
    invoice_total: number,
    cid: string,
  ) {
    this.id = id;
    this.invoice_no = invoice_no;
    this.company_name = company_name;
    this.company_address = company_address;
    this.company_email = company_email;
    this.office_num = office_num;
    this.fax_number = fax_number; 
    this.status = status;
    this.created_at = created_at;
    this.created_at_str = created_at_str;
    this.due_at_str = due_at_str;
    this.due_at = due_at;
    this.domestic_flight = domestic_flight;
    this.inbound_flight = inbound_flight;
    this.outbound_flight = outbound_flight;
    this.over_flight = over_flight;
    this.other_flight = other_flight;
    this.sub_total = sub_total;
    this.surcharge = surcharge;
    this.invoice_total = invoice_total;
    this.cid = cid;
  }
}
