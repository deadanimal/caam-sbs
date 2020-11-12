export class StatementAccount {
  public id: string;
  public issuedate: any;
  public transaction: string;
  public transactionnumber: string;
  public debit: number;
  public credit: number;
  public balance: number;

  constructor(
    id: string,
    issuedate: any,
    transaction: string,
    transactionnumber: string,
    debit: number,
    credit: number,
    balance: number,
  ) {
    this.id = id;
    this.issuedate = issuedate;
    this.transaction = transaction;
    this.transactionnumber = transactionnumber;
    this.debit = debit;
    this.credit = credit;
    this.balance = balance;
  }
}
