
export class CreditDebit {

  public id: string;
  public cid_id: string;
  public note_no: string;
  public created_at: string;
  public created_at_str: string;
  public company_name: string;

  public company_address: string;
  public company_email: string;
  public company_tel: string;
  public company_fax: string;

  public invoice_id: string;
  public invoice_amount: string;

  public remarks: string;
  public amount: string;
  public note_type: string;

  constructor(

    id: string,
    cid_id: string,
    note_no: string,
    created_at: string,
    created_at_str: string,
    company_name: string,
    company_address: string,
    company_email: string,
    company_tel: string,
    company_fax: string,
    invoice_id: string,
    invoice_amount: string,
    remarks: string,
    amount: string,
    note_type: string,

  ) {
    this.id = id;
    this.cid_id = cid_id;
    this.note_no = note_no;
    this.created_at = created_at;
    this.created_at_str = created_at_str;
    this.company_name = company_name;

    this.company_address = company_address;
    this.company_email = company_email;
    this.company_tel = company_tel;
    this.company_fax = company_fax;
    this.invoice_id = invoice_id;
    this.invoice_amount = invoice_amount;

    this.remarks = remarks;
    this.amount = amount;
    this.note_type = note_type;
  }
}
