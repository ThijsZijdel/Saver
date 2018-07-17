export class Spending {
  total: number;
  name: string;
  description: string;

  count: number;
  month :string;
  shortName: string;

  id: number;




  constructor(total: number, name: string, description: string, count: number, month :string, shortName: string, id: number) {
    this.total = total;
    this.name = name;
    this.description = description;
    this.count = count;
    this.month = month;

    this.shortName = shortName;
    this.id = id;


  }
}
