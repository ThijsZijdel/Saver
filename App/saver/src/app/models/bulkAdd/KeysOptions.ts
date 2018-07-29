export class KeysOptions {
  name: string;
  isClicked: boolean;

  matchedAttribute: string;
  matchedAttributeId: number;

  isInfo: boolean;

  constructor(name: string, isClicked: boolean, matchedAttribute: string, matchedAttributeId: number, isInfo: boolean){
    this.name = name;
    this.isClicked = isClicked;
    this.matchedAttribute = matchedAttribute;
    this.matchedAttributeId = matchedAttributeId;
    this.isInfo = isInfo;
  }
}
