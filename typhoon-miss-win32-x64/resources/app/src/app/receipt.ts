import { Item } from './item';

export class Receipt {
  customer: string;
  route: string;
  headColor: string;
  items: Array<Item>;

  constructor(customer: string, route: string, headColor: string) {
    this.customer = customer;
    this.route = route;
    this.headColor = headColor;
    this.items = [];
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  toTable(): string {
    let table: string = `
      <style>
        table { border-collapse: collapse; font-family: 'Helvetica Neue', Arial, sans-serif; page-break-before: always; width: 100%; -webkit-print-color-adjust: exact; }
        thead { text-align: left; }
        th, td { border: 1px solid #222222 !important; padding: .5rem; }
        td.cell-center { text-align: center; }
      </style>
      <table>
        <thead style="background: ${this.headColor}">
          <tr>
            <th colspan="3">${this.route}</th>
          </tr>
          <tr>
            <th colspan="3">${this.customer}</th>
          </tr>
          <tr>
            <th>Quantity</th>
            <th>POS Item</th>
            <th>POS Note</th>
          </tr>
        </thead>
        <tbody>`;

    for(var i in this.items) {
      table += this.items[i].toRow();
    }

    table += '</tbody></table>';
    return table;
  }
}
