import { Rule } from './rule';

export class ComplexRule implements Rule {
  containsString: string;
  containsNumber: number;
  color: string;

  match(s: string): boolean {
    var matches = s.match(/\d+/g);
    if(matches != null) {
      var val = parseInt(s,10);
      if(val === this.containsNumber) {
        return s.includes(this.containsString);
      }
    }
    return false;
  }

  getColor(): string {
    return this.color;
  }

  constructor(containsNumber: number, containsString: string, color: string) {
    this.containsNumber = containsNumber;
    this.containsString = containsString;
    this.color = color;
  }
}
