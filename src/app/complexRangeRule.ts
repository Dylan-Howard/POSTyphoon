import { Rule } from './rule';

export class ComplexRangeRule implements Rule {
  lowerCondition: number;
  upperCondition: number;
  lowerEquality: boolean;
  upperEquality: boolean;
  containsString: string;
  color: string;

  match(s: string): boolean {
    if(s.includes(this.containsString)) {
      var matches = s.match(/\d+/g);
      if(matches != null) {
        var val = parseInt(s,10);
        if(this.lowerEquality && this.upperEquality) {
          return (val >= this.lowerCondition && val <= this.upperCondition);
        } else if(this.lowerEquality) {
          return (val >= this.lowerCondition && val < this.upperCondition);
        } else if(this.upperEquality) {
          return (val > this.lowerCondition && val <= this.upperCondition);
        } else {
          return (val > this.lowerCondition && val < this.upperCondition);
        }
      }
    }
  }

  getColor(): string {
    return this.color;
  }

  constructor(lowerCondition: number, upperCondition: number, lowerEquality: boolean, upperEquality: boolean, containsString: string, color: string) {
    this.lowerCondition = lowerCondition;
    this.upperCondition = upperCondition;
    this.lowerEquality = lowerEquality;
    this.upperEquality = upperEquality;
    this.containsString = containsString;
    this.color = color;
  }
}
