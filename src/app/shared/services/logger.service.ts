import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  public log(message?: unknown, ...optionalParams: unknown[]): void {
    console.log(message, ...optionalParams);
  }

  public error(message?: unknown, ...optionalParams: unknown[]): void {
    console.error(message, ...optionalParams);
  }
}
