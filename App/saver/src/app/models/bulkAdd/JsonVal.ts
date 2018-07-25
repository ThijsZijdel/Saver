import {Category} from "../Category";

export class JsonVal{
  Datum: number;
  NaamOmschrijving: string;
  Rekening: string;
  Tegenrekening: string;
  Code: string;
  AfBij: string;
  Bedrag;
  MutatieSoort: string;
  Mededelingen: string;


  constructor(Datum: number,
              NaamOmschrijving: string,
              Rekening: string,
              Tegenrekening: string,
              Code: string,
              AfBij: string,
              Bedrag,
              MutatieSoort: string,
              Mededelingen: string,
              mainCategories?: Category[],
              subCategories? : Category[]
  ){
    this.Datum = Datum;
    this.NaamOmschrijving = NaamOmschrijving;
    this.Rekening = Rekening;
    this.Tegenrekening = Tegenrekening;
    this.Code = Code;
    this.AfBij = AfBij;
    this.Bedrag = Bedrag;
    this.MutatieSoort = MutatieSoort;
    this.Mededelingen = Mededelingen;

  }
}
