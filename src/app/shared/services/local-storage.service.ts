import { inject, Injectable } from '@angular/core';
import { LoggerService } from '@app/shared/services';
import { Token } from '@app/shared/types';

type LocalStorageEntry = {
  key: 'token';
  value: Token;
};

@Injectable()
export class LocalStorageService {
  private readonly logger = inject(LoggerService);

  setItem<K extends LocalStorageEntry['key']>(
    key: K,
    value: Extract<LocalStorageEntry, { key: K }>['value']
  ): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      this.logger.error(`Error saving to localStorage with key ${key}:`, error);
    }
  }

  getItem<K extends LocalStorageEntry['key']>(
    key: K
  ): Extract<LocalStorageEntry, { key: K }>['value'] | undefined {
    try {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue === null) {
        return undefined;
      }
      return JSON.parse(jsonValue);
    } catch (error) {
      this.logger.error(
        `Error retrieving from localStorage with key ${key}:`,
        error
      );
      return undefined;
    }
  }

  removeItem(key: LocalStorageEntry['key']): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      this.logger.error(
        `Error removing from localStorage with key ${key}:`,
        error
      );
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      this.logger.error(`Error clearing localStorage:`, error);
    }
  }

  exists(key: LocalStorageEntry['key']): boolean {
    return this.getItem(key) !== undefined;
  }
}
