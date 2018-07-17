export class BalanceType {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;


  constructor(id: number, name: string, description: string,color: string, icon: string) {
    this.id = id;
    this.name = name;

    this.description = description;
    this.color = color;
    this.icon = icon;
  }
}


