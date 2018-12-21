import { Injectable } from '@angular/core';

@Injectable()
export class ContextUtil {
  public static getAppUrl() {
    return `http://192.168.0.17:4200/`;
  }
  public static getApiUrl() {
    return `http://192.168.0.17:9000/`;
  }
}
