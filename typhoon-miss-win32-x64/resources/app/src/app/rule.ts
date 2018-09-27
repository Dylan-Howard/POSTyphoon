export interface Rule {
  lowerCondition?: number;
  upperCondition?: number;
  lowerEquality?: boolean;
  upperEquality?: boolean;
  containsString?: string;
  color: string;

  match(s: string): boolean;
  getColor(): string;
}
