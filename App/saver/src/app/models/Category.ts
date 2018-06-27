export class Category {
  id: number;
  name: string;


  description: string;
  color: string;

  subCategoryFk?: number;

  constructor(id: number, name: string, description: string, color: string, subCategoryFk?: number){
    this.id = id;
    this.name = name;
    this.subCategoryFk = subCategoryFk;

    this.description = description;
    this.color = color;
  }

}
