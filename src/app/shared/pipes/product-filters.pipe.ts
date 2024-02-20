import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilters',
})
export class ProductFiltersPipe implements PipeTransform {
  transform(data: any[], query: any): any[] {
    if (!data || !query || !Object.keys(query).length) {
      return data;
    }
    return data.filter(function (item) {
      for (const key in query) {
        if (item[key] === undefined || item[key] != query[key]) return false;
      }
      return true;
    });
  }
}
