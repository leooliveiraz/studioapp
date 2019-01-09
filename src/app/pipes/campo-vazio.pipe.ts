import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'campoVazio'
})
export class CampoVazioPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === null || value === '' ) {
      return '';
    } else {
      return 'active';
    }
  }

}
