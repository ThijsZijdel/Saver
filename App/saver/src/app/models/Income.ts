export class Income {
  id: number;
  name: string;
  imgLink: string;
  mainDescription: string;

  constructor(id: number, name: string, imgLink: string, mainDescription: string) {
    this.id = id;
    this.name = name;
    this.imgLink = imgLink;
    this.mainDescription = mainDescription;

  }
}
