import { Rule } from './rule';

export class ContainsRule implements Rule {
  containsString: string;
  color: string;

  constructor(containsString: string, color: string) {
    this.containsString = containsString;
    this.color = color;
  }

  match(s: string): boolean {
    return s.includes(this.containsString);
  }

  getColor(): string {
    return this.color;
  }
}
