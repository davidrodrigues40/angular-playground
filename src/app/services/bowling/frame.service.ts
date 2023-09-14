import { Injectable } from '@angular/core';

@Injectable()
export class FrameService {

  constructor() { }

  getFrameValues(values: number[]): string[] {

    const value1 = this.caclulateValue1(values[0]);
    const value2 = this.caclulateValue2(values[0], values[1]);

    if (values.length == 3)
      return [value1, value2, this.caclulateValue1(values[2])];

    return [value1, value2];
  }

  private caclulateValue1(value: number): string {
    if (value == 10)
      return 'X';

    return value.toString();
  }

  private caclulateValue2(value1: number, value2: number): string {
    if (value1 == 10) return '';
    if (value1 + value2 == 10)
      return '/';

    return value2.toString();
  }
}
