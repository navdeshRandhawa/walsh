/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(data: any[], searchStr: string): any[] {
    return searchStr
      ? data.filter(item =>
          JSON.stringify(Object.values(item))
            .toLowerCase()
            .includes(searchStr.toLowerCase())
        )
      : data;
  }
}
