
export class AgingInvoice {

  public id: string;
  public cid: string;
  public invoiceperiod: string;
  public invoicenumber: number;
  public invoicedate: any;
  public invoicetotal: number;
  public invoicesubtotal: number;
  public month0to1: number;
  public month1to3: number;
  public month4to6: number;
  public month7to12: number;
  public month13to36: number;
  public month37to72: number;
  public month72: number;
  public total0to1: number;
  public total1to3: number;
  public total4to6: number;
  public total7to12: number;
  public total13to36: number;
  public total37to72: number;
  public total72: number;

  constructor(
    id: string,
    cid: string,
    invoiceperiod: string,
    invoicenumber: number,
    invoicedate: any,
    invoicetotal: number,
    invoicesubtotal: number,
    month0to1: number,
    month1to3: number,
    month4to6: number,
    month7to12: number,
    month13to36: number,
    month37to72: number,
    month72: number,
    total0to1: number,
    total1to3: number,
    total4to6: number,
    total7to12: number,
    total13to36: number,
    total37to72: number,
    total72: number,

  ) {
    this.id = id;
    this.cid = cid;
    this.invoiceperiod = invoiceperiod;
    this.invoicenumber = invoicenumber;
    this.invoicedate = invoicedate;
    this.invoicetotal = invoicetotal;
    this.invoicesubtotal = invoicesubtotal;
    this.invoicenumber = invoicenumber;
    this.month0to1 = month0to1;
    this.month1to3 = month1to3;
    this.month4to6 = month4to6;
    this.month7to12 = month7to12;
    this.month13to36 = month13to36;
    this.month37to72 = month37to72;
    this.month72 = month72;
    this.total0to1 = total0to1;
    this.total1to3 = total1to3;
    this.total4to6 = total4to6;
    this.total7to12 = total7to12;
    this.total13to36 = total13to36;
    this.total37to72 = total37to72;
    this.total72 = total72;

  }
}
