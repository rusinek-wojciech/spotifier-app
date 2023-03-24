import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unicode',
})
export class UnicodePipe implements PipeTransform {
  readonly regex = /&#x([A-Fa-f0-9]+);/g;
  readonly hex = 16;

  transform(str: string | null) {
    return str?.replace(this.regex, (_, s) =>
      String.fromCharCode(parseInt(s, this.hex))
    );
  }
}
