import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unicode',
  standalone: true,
})
export class UnicodePipe implements PipeTransform {
  private readonly regex = /&#x([A-Fa-f0-9]+);/g;
  private readonly hex = 16;

  transform(value?: string | null): string | undefined {
    if (typeof value !== 'string') return;
    return value.replace(this.regex, (_, s) =>
      String.fromCharCode(parseInt(s, this.hex))
    );
  }
}
