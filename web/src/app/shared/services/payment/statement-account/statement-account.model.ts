export class StatementAccount {
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
  public credit_code: string; 
  public debit_code: string; 
  public credit_account: string; 
  public debit_account: string; 

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
    credit_code: string, 
    debit_code: string, 
    credit_account: string, 
    debit_account: string, 
  
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
    this.credit_code = credit_code; 
    this.debit_code = debit_code; 
    this.credit_account = credit_account; 
    this.debit_account = debit_account; 
  
  }
}
