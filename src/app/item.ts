export class Item {
  quantity: string;
  item: string;
  description: string;
  color: string

  constructor(quantity: string, item: string, description: string, color: string) {
    this.quantity = quantity;
    this.item = item;
    this.description = description;
  }

  toRow(): string {
    return `
      <tr style="background-color='${this.color}'">
        <td class="cell-center">${this.quantity}</td>
        <td>${this.item}</td>
        <td>${this.description}</td>
      </tr>`;
  }
}
