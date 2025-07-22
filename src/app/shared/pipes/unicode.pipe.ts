import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unicode',
  standalone: true,
})
export class UnicodePipe implements PipeTransform {
  private readonly replacer = (_: unknown, s: string): string =>
    String.fromCharCode(parseInt(s, 16));

  transform(value?: string | null): string | undefined {
    if (typeof value !== 'string') {
      return;
    }
    return value.replace(/&#x([A-Fa-f0-9]+);/g, this.replacer);
  }
}
