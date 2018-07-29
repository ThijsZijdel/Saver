export class Company {
  id: number;
  name: string;


  description: string;
  website: string;

  telephone: string;
  email: string;

  categoryFk?: number;

  iban?: string;

  transactionName?: string;

  constructor(id: number, name: string, description: string, website: string, telephone:string, email: string, iban?:string, categoryFk?: number, transactionName?: string){
    this.id = id;
    this.name = name;
    this.categoryFk = categoryFk;

    this.description = description;
    this.website = website;

    this.telephone = telephone;
    this.email = email;
    this.iban = iban;
    this.transactionName = transactionName;
  }


}
