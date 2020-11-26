export class GeneralLedger {
  public id: string;
  public cid: string;
  public company_name: string;
  public created_at: any;
  public created_at_str: string;
  public transaction: string;
  public transaction_number: string;
  public debit: number;
  public credit: number;
  public balance: number;
  public account: string; 
  public code: string; 

  constructor(
    id: string,
    cid: string,
    company_name: string,
    created_at: any,
    created_at_str: string,
    transaction: string,
    transaction_number: string,
    debit: number,
    credit: number,
    balance: number,
    code: string, 
    account: string, 
  
  ) {
    this.id = id;
    this.cid = cid;
    this.company_name = company_name;
    this.created_at =  created_at;
    this.created_at_str = created_at_str;
    this.transaction = transaction;
    this.transaction_number = transaction_number;
    this.debit = debit;
    this.credit = credit;
    this.balance = balance;
    this.code = code; 
    this.account = account; 
  
  }
}
