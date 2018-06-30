export class Balance {
  id: number;
  name: string;
  amount: number;
  description: string;
  type: string;
  icon: string;
  bankFk: number;
  maxDebt: number;

  constructor(id: number, name: string, amount: number, description: string,icon: string, type: string, bankFk: number, maxDebt: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.description = description;
    this.icon = icon;
    this.type = type;
    this.bankFk = bankFk;
    this.maxDebt = maxDebt;
  }
}
