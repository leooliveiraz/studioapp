import { Injectable } from '@angular/core';

@Injectable()
export class ContextUtil {
  public static getAppUrl() {
    return `http://localhost:4200/`;
  }
  public static getApiUrl() {
    return `http://localhost:9000/`;
  }
}
