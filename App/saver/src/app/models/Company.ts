export class Company {
  id: number;
  name: string;


  description: string;
  website: string;

  telephone: string;
  email: string;

  subCategoryFk?: number;

  constructor(id: number, name: string, description: string, website: string, telephone:string, email: string, subCategoryFk?: number){
    this.id = id;
    this.name = name;
    this.subCategoryFk = subCategoryFk;

    this.description = description;
    this.website = website;

    this.telephone = telephone;
    this.email = email;
  }


}
