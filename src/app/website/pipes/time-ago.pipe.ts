import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';
@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date): string {
    //esta funcion determina cuanto tiempo a pasado desde la fecha dada (value) a la actualidad (new Date())
    return formatDistance(new Date(), value);
  }

}
